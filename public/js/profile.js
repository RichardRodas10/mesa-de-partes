import { auth, db } from "./firebase-config.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

let profileEditMode = false;

// -----------------------------
// Referencias de selects e inputs
// -----------------------------
const departamentoSelect = document.getElementById("departamento");
const provinciaSelect = document.getElementById("provincia");
const distritoSelect = document.getElementById("distrito");

const departamentoInput = document.getElementById("departamento-input");
const provinciaInput = document.getElementById("provincia-input");
const distritoInput = document.getElementById("distrito-input");

// -----------------------------
// Agregar clase para que los selects sean editables
// -----------------------------
departamentoSelect.classList.add('profile-editable-field');
provinciaSelect.classList.add('profile-editable-field');
distritoSelect.classList.add('profile-editable-field');

// -----------------------------
// Inicializar selects de ubigeo con preselección
// -----------------------------
function initUbigeo(userData) {
    ubigeo.departamentos().forEach(dep => {
        const option = document.createElement("option");
        option.value = dep;
        option.textContent = dep;
        departamentoSelect.appendChild(option);
    });

    if (userData.departamento) {
        departamentoSelect.value = userData.departamento;
        actualizarProvincias(userData.departamento, userData.provincia);
    }

    if (userData.provincia) provinciaSelect.value = userData.provincia;
    if (userData.distrito) distritoSelect.value = userData.distrito;

    departamentoSelect.addEventListener("change", () => {
        actualizarProvincias(departamentoSelect.value, null);
        distritoSelect.innerHTML = `<option value="">Seleccione...</option>`;
    });

    provinciaSelect.addEventListener("change", () => {
        actualizarDistritos(departamentoSelect.value, provinciaSelect.value, null);
    });

    departamentoSelect.disabled = true;
    provinciaSelect.disabled = true;
    distritoSelect.disabled = true;
}

function actualizarProvincias(dep, provSelected) {
    provinciaSelect.innerHTML = `<option value="">Seleccione...</option>`;
    if (!dep) return;
    ubigeo.provincias(dep).forEach(prov => {
        const option = document.createElement("option");
        option.value = prov;
        option.textContent = prov;
        if (prov === provSelected) option.selected = true;
        provinciaSelect.appendChild(option);
    });
}

function actualizarDistritos(dep, prov, distSelected) {
    distritoSelect.innerHTML = `<option value="">Seleccione...</option>`;
    if (!dep || !prov) return;
    ubigeo.distritos(dep, prov).forEach(dist => {
        const option = document.createElement("option");
        option.value = dist;
        option.textContent = dist;
        if (dist === distSelected) option.selected = true;
        distritoSelect.appendChild(option);
    });
}

// -----------------------------
// Cargar datos del usuario
// -----------------------------
function cargarDatosUsuario() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (!userData) return;

    document.querySelectorAll('.profile-form-control').forEach(input => {
        const label = input.previousElementSibling?.textContent.trim();
        switch (label) {
            case "Apellidos y nombres":
                input.value = `${userData.apellidoPaterno} ${userData.apellidoMaterno}, ${userData.nombres}`;
                break;
            case "Documento Identidad":
                input.value = userData.dni || "";
                break;
            case "Dirección/domicilio fiscal":
                input.value = userData.direccion || "";
                break;
            case "Celular":
                input.value = userData.celular || "";
                break;
            case "Correo Electrónico":
                input.value = userData.correo || "";
                break;
            case "Departamento":
                input.value = userData.departamento || "";
                break;
            case "Provincia":
                input.value = userData.provincia || "";
                break;
            case "Distrito":
                input.value = userData.distrito || "";
                break;
        }
    });

    initUbigeo(userData);

    if (userData.departamento) departamentoInput.value = userData.departamento;
    if (userData.provincia) provinciaInput.value = userData.provincia;
    if (userData.distrito) distritoInput.value = userData.distrito;

    if (!profileEditMode) {
        departamentoInput.style.display = 'block';
        provinciaInput.style.display = 'block';
        distritoInput.style.display = 'block';
        departamentoSelect.style.display = 'none';
        provinciaSelect.style.display = 'none';
        distritoSelect.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", cargarDatosUsuario);

// -----------------------------
// Tabs
// -----------------------------
window.showProfileTab = function (tabId) {
    document.querySelectorAll('.profile-tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.profile-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
};

// -----------------------------
// Alternar modo edición
// -----------------------------
window.toggleProfileEdit = function () {
    profileEditMode = !profileEditMode;
    const editableFields = document.querySelectorAll('.profile-editable-field');
    const editButton = document.querySelector('.profile-edit-btn');
    const updateButton = document.querySelector('.profile-update-btn');

    if (profileEditMode) {
        editableFields.forEach(field => {
            if (field.tagName === 'SELECT') field.disabled = false;
            else field.readOnly = false;
            field.classList.add('editable');
        });
        departamentoSelect.style.display = 'block';
        provinciaSelect.style.display = 'block';
        distritoSelect.style.display = 'block';
        departamentoInput.style.display = 'none';
        provinciaInput.style.display = 'none';
        distritoInput.style.display = 'none';

        editButton.innerHTML = '✗ Cancelar';
        editButton.style.backgroundColor = '#dc3545';
        updateButton.style.display = 'inline-flex';
    } else {
        editableFields.forEach(field => {
            if (field.tagName === 'SELECT') field.disabled = true;
            else field.readOnly = true;
            field.classList.remove('editable');
        });
        departamentoInput.style.display = 'block';
        provinciaInput.style.display = 'block';
        distritoInput.style.display = 'block';
        departamentoSelect.style.display = 'none';
        provinciaSelect.style.display = 'none';
        distritoSelect.style.display = 'none';

        editButton.innerHTML = '<i class="fa-solid fa-pencil"></i> Editar';
        editButton.style.backgroundColor = '#1983a3';
        updateButton.style.display = 'none';
        cargarDatosUsuario();
    }
};

// -----------------------------
// Actualizar perfil
// -----------------------------
window.updateUserProfile = async function () {
    const user = auth.currentUser;
    if (!user) return;

    const userDocRef = doc(db, "usuarios", user.uid);
    const updatedData = {};

    const direccionInput = document.querySelector('input[placeholder="Dirección/domicilio fiscal"]') || document.querySelector('#direccion-input');
    const celularInput = document.querySelector('input[placeholder="Celular"]') || document.querySelector('#celular-input');

    updatedData.direccion = direccionInput?.value || '';
    updatedData.celular = celularInput?.value || '';

    // Solo actualizar si el usuario seleccionó una opción válida
    if (departamentoSelect.value && departamentoSelect.value !== "") {
        updatedData.departamento = departamentoSelect.value;
    }
    if (provinciaSelect.value && provinciaSelect.value !== "") {
        updatedData.provincia = provinciaSelect.value;
    }
    if (distritoSelect.value && distritoSelect.value !== "") {
        updatedData.distrito = distritoSelect.value;
    }

    try {
        await updateDoc(userDocRef, updatedData);

        const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
        sessionStorage.setItem("userData", JSON.stringify({ ...userData, ...updatedData }));

        document.getElementById('profileSuccessMessage').textContent = 'Perfil actualizado correctamente.';
        document.getElementById('profileSuccessModal').style.display = 'flex';
        toggleProfileEdit();
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        alert("Error al actualizar el perfil.");
    }
};

// -----------------------------
// Cambio de contraseña
// -----------------------------
window.changeUserPassword = async function () {
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validaciones básicas
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Validación de requisitos
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        alert("La nueva contraseña no cumple con los requisitos:\n- 8 caracteres mínimo\n- Mayúscula\n- Minúscula\n- Número\n- Carácter especial");
        return;
    }

    try {
        const user = auth.currentUser;
        if (!user) return;

        // Reautenticación
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Cambio de contraseña
        await updatePassword(user, newPassword);

        // Mostrar modal de éxito
        document.getElementById("profileSuccessMessage").textContent = "Contraseña actualizada correctamente.";
        document.getElementById("profileSuccessModal").style.display = "flex";

        clearPasswordFields();
    } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        if (error.code === "auth/wrong-password") {
            alert("La contraseña actual es incorrecta.");
        } else {
            alert("Error al cambiar la contraseña: " + error.message);
        }
    }
};

function clearPasswordFields() {
    document.getElementById("current-password").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-password").value = "";
}

// -----------------------------
// Cerrar modal
// -----------------------------
window.closeProfileModal = function () {
    document.getElementById('profileSuccessModal').style.display = 'none';
    const message = document.getElementById('profileSuccessMessage').textContent;
    if (message.includes('Contraseña')) showProfileTab('profile-data-tab');
};

window.addEventListener('click', function (event) {
    const profileModal = document.getElementById('profileSuccessModal');
    if (event.target === profileModal) closeProfileModal();
});
