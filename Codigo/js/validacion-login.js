document.addEventListener("submit", function (event) {
    // 1. Verificamos que sea nuestro formulario de login
    if (event.target.id !== "loginForm") return;

    // 2. IMPORTANTE: Evitamos que la página se recargue (comportamiento nativo de HTML5)
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const loginSuccess = document.getElementById("login-success");

    // 3. Usamos la validación nativa de HTML5 antes de proceder
    if (event.target.checkValidity()) {
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Tu lógica original de búsqueda
        fetch(`http://localhost:3000/users?username=${email}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0];
                    if (user.password === password) {
                        loginSuccess.classList.add("visible");

                        // Llamada a tu script manejo-sesion.js
                        guardarSesionUsuario(user.id, user.username, user.password).then(function () {
                            setTimeout(() => {
                                window.location.href = "mi-espacio.html";
                            }, 1000);
                        });
                    } else {
                        mostrarError(passwordInput, passwordError, "La contraseña es incorrecta.");
                    }
                } else {
                    mostrarError(emailInput, emailError, "Usuario no encontrado.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                mostrarError(emailInput, emailError, "Error de conexión.");
            });
    }
});

// Mantén tus funciones auxiliares (mostrarError, limpiarError) aquí abajo...
function mostrarError(input, errorSpan, mensaje) {
    input.classList.add("input--error");
    errorSpan.textContent = mensaje;
    errorSpan.classList.add("visible");
}