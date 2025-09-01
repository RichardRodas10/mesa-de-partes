import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, updatePassword, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, setDoc, Timestamp, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form = document.getElementById("registerCompleteForm");
const errorMessage = document.getElementById("errorMessage");
const successModal = document.getElementById("successModal");
const modalOkButton = document.getElementById("modalOkButton");
const celularInput = document.getElementById("celular");
const passwordInput = document.getElementById("password");
const passwordReqDiv = document.getElementById("passwordRequirements");

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

function hideError() {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
}

// Limitar input de celular a solo números y máximo 9 dígitos
celularInput.addEventListener("input", () => {
    celularInput.value = celularInput.value.replace(/\D/g, "").slice(0, 9);
});

// Expresión regular para contraseña: min 8, mayúscula, minúscula, número y caracter especial
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Validación en tiempo real de contraseña
passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;

    if (val === "") {
        passwordInput.style.borderColor = "#ccc";
        passwordInput.style.backgroundColor = "white";
    } else if (passwordRegex.test(val)) {
        passwordInput.style.borderColor = "green";
        passwordInput.style.backgroundColor = "#e6f4ea";
    } else {
        passwordInput.style.borderColor = "red";
        passwordInput.style.backgroundColor = "#f8d7da";
    }

    // Mostrar indicadores de requisitos
    const requirements = [
        { regex: /.{8,}/, text: "Mínimo 8 caracteres" },
        { regex: /[A-Z]/, text: "Una mayúscula" },
        { regex: /[a-z]/, text: "Una minúscula" },
        { regex: /\d/, text: "Un número" },
        { regex: /[\W_]/, text: "Un caracter especial" }
    ];

    passwordReqDiv.innerHTML = requirements.map(req => {
        const cumple = req.regex.test(val);
        const color = val === "" ? "#555" : (cumple ? "green" : "red");
        return `<span style="color:${color}">&#9679;</span> ${req.text}`;
    }).join(" &nbsp; ");
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    const correo = localStorage.getItem("correoVerificado");
    const passwordTemp = localStorage.getItem("passwordTemp");

    const password = passwordInput.value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const dni = document.getElementById("dni").value.trim();
    const apellidoPaterno = document.getElementById("apellidoPaterno").value.trim();
    const apellidoMaterno = document.getElementById("apellidoMaterno").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const celular = celularInput.value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const departamento = document.getElementById("departamento").value.trim();
    const provincia = document.getElementById("provincia").value.trim();
    const distrito = document.getElementById("distrito").value.trim();

    if (!correo || !passwordTemp) {
        showError("No hay correo verificado. Regresa al paso anterior.");
        return;
    }

    if (password !== confirmPassword) {
        showError("Las contraseñas no coinciden.");
        return;
    }

    if (!passwordRegex.test(password)) {
        showError("La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y caracter especial.");
        return;
    }

    if (!/^[9]\d{8}$/.test(celular)) {
        showError("El número de celular debe contener 9 dígitos y comenzar con 9.");
        return;
    }

    try {
        const usuariosRef = collection(db, "usuarios");
        const q = query(usuariosRef, where("dni", "==", dni));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showError("El DNI ingresado ya está registrado. Por favor utiliza otro.");
            return;
        }

        const userCredential = await signInWithEmailAndPassword(auth, correo, passwordTemp);
        const user = userCredential.user;

        await updatePassword(user, password);

        await setDoc(doc(db, "usuarios", user.uid), {
            correo,
            dni,
            apellidoPaterno,
            apellidoMaterno,
            nombres,
            celular,
            direccion,
            departamento,
            provincia,
            distrito,
            fechaRegistro: Timestamp.now()
        });

        await signOut(auth);
        localStorage.removeItem("correoVerificado");
        localStorage.removeItem("passwordTemp");

        successModal.style.display = "flex";

        modalOkButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });

    } catch (error) {
        console.error(error);
        showError("Error al completar el registro: " + error.message);
    }
});
