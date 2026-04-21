document.addEventListener("submit", function (event) {
    // Verificamos que sea el formulario de login
    if (event.target.id !== "loginForm") return;

    // Evitamos que la validación por defecto de HTML5 recargue la página y así
    // poder trabajar con los datos desde 'validacion-login.js'
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const loginSuccess = document.getElementById("login-success");

    // checkValidity() verifica directamente en el formulario de HTML5 si las
    // credenciales son las correctas.
    if (event.target.checkValidity()) {
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        fetch(`http://localhost:3000/users?username=${email}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0];
                    if (user.password === password) {
                        loginSuccess.classList.add("visible");

                        // Llamada a manejo-sesion.js
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


function mostrarError(input, errorSpan, mensaje) {
    input.classList.add("input--error");
    errorSpan.textContent = mensaje;
    errorSpan.classList.add("visible");
}