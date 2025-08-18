// login.js
import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loginUsuario(e) {
    e.preventDefault();

    const correo = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!correo || !password) {
        alert("Por favor, ingresa correo y contraseña.");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, correo, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            alert("Debes verificar tu correo antes de iniciar sesión.");
            return;
        }

        // Actualizar Firestore emailVerified
        const userRef = doc(db, "usuarios", user.uid);
        await updateDoc(userRef, { emailVerified: true });

        alert(`Bienvenido ${user.email}`);
        window.location.href = "home.html";

    } catch (error) {
        console.error(error);
        if (error.code === "auth/user-not-found") {
            alert("Usuario no registrado.");
        } else if (error.code === "auth/wrong-password") {
            alert("Contraseña incorrecta.");
        } else {
            alert("Error al iniciar sesión: " + error.message);
        }
    }
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", loginUsuario);