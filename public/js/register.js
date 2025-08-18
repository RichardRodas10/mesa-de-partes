// register.js
import { auth, db } from "./firebase-config.js";
auth.languageCode = 'es'; 
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, setDoc, collection, query, where, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// --- Validación mínima ---
function validarFormulario() {
    const dni = document.getElementById("dni").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const apellidoPaterno = document.getElementById("apellidoPaterno").value.trim();
    const apellidoMaterno = document.getElementById("apellidoMaterno").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const direccion = document.getElementById("direccion").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!dni || !fechaNacimiento || !celular || !correo || !password || !confirmPassword || !direccion) {
        alert("Todos los campos son obligatorios.");
        return false;
    }

    if (!apellidoPaterno || !apellidoMaterno || !nombres) {
        alert("Debe validar su DNI antes de registrarse.");
        return false;
    }    

    if (dni.length !== 8 || isNaN(dni)) {
        alert("El DNI debe tener 8 dígitos numéricos.");
        return false;
    }

    if (new Date(fechaNacimiento) > new Date()) {
        alert("La fecha de nacimiento no puede ser futura.");
        return false;
    }

    if (!/^9\d{8}$/.test(celular)) {
        alert("El celular debe tener 9 dígitos y empezar con 9.");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        alert("Correo electrónico no válido.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }
    return true;
}

// --- Registro ---
async function registrarUsuario(e) {
    e.preventDefault();
    if (!validarFormulario()) return;

    const dni = document.getElementById("dni").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const apellidoPaterno = document.getElementById("apellidoPaterno").value.trim();
    const apellidoMaterno = document.getElementById("apellidoMaterno").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const departamento = document.getElementById("departamento").value;
    const provincia = document.getElementById("provincia").value;
    const distrito = document.getElementById("distrito").value;
    const direccion = document.getElementById("direccion").value;

    try {
        // 1️⃣ Verificar DNI único
        const dniQuery = query(collection(db, "usuarios"), where("dni", "==", dni));
        const dniSnap = await getDocs(dniQuery);
        if (!dniSnap.empty) {
            alert("Este DNI ya está registrado.");
            return;
        }

        // 2️⃣ Verificar correo único temporal
        const correoQuery = query(collection(db, "usuarios"), where("correo", "==", correo));
        const correoSnap = await getDocs(correoQuery);
        const ahora = Date.now();
        if (!correoSnap.empty) {
            const userData = correoSnap.docs[0].data();
            const registroTiempo = userData.fechaRegistro.toMillis ? userData.fechaRegistro.toMillis() : userData.fechaRegistro;
            
            if (userData.emailVerified) {
                alert("Este correo ya está en uso.");
                return;
            }

            if ((ahora - registroTiempo) < 5 * 60 * 1000) { // menos de 5 min
                alert("Este correo está pendiente de activación. Por favor espera 5 minutos.");
                return;
            }
        }

        // 3️⃣ Registrar en Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
        const user = userCredential.user;

        // 4️⃣ Guardar datos en Firestore con fechaRegistro y emailVerified
        await setDoc(doc(db, "usuarios", user.uid), {
            dni,
            fechaNacimiento,
            apellidoPaterno,
            apellidoMaterno,
            nombres,
            celular,
            correo,
            departamento,
            provincia,
            distrito,
            direccion,
            emailVerified: false,
            fechaRegistro: Timestamp.now()
        });
        //auth.languageCode = 'es'; 
        // 5️⃣ Enviar correo de verificación
        await sendEmailVerification(user);

        // 6️⃣ Mostrar modal o alert
        alert(`Registro exitoso. Hemos enviado un correo de activación a: ${correo.substring(0,3)}****@${correo.split("@")[1]}. Por favor revisa tu correo para activar tu cuenta.`);

        window.location.href = "index.html";

    } catch (error) {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
            alert("Este correo ya está en uso.");
        } else {
            alert("Error al registrar: " + error.message);
        }
    }
}

const dniInput = document.getElementById("dni");
const celInput = document.getElementById("celular");

// 🔹 Solo permitir números y máximo 8 dígitos en DNI
dniInput.addEventListener("input", () => {
    dniInput.value = dniInput.value.replace(/\D/g, "").slice(0, 8);
});

// 🔹 Solo permitir números y máximo 9 dígitos en celular
celInput.addEventListener("input", () => {
    celInput.value = celInput.value.replace(/\D/g, "").slice(0, 9);
});

// --- Listener ---
const form = document.getElementById("registerForm");
form.addEventListener("submit", registrarUsuario);