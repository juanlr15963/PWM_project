document.addEventListener("click", function (event) {
    if (event.target.id !== "btn-login") return;

    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var emailError = document.getElementById("email-error");
    var passwordError = document.getElementById("password-error");
    var loginSuccess = document.getElementById("login-success");

    var emailValido = validarEmail(emailInput, emailError);
    var passwordValido = validarPassword(passwordInput, passwordError);

    if (emailValido && passwordValido) {
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Buscar usuario en la base de datos
        fetch(`http://localhost:3000/users?username=${email}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0];
                    // En un caso real, la contraseña estaría hasheada y se compararía de forma segura.
                    // Aquí, para la simulación, hacemos una comparación simple.
                    if (user.password === password) {
                        loginSuccess.classList.add("visible");
                        // Guardamos el ID del usuario en la sesión
                        guardarSesionUsuario(user.id, user.username, user.password).then(function () {
                            setTimeout(function () {
                                window.location.href = "mi-espacio.html";
                            }, 1000);
                        });
                    } else {
                        mostrarError(passwordInput, passwordError, "La contraseña es incorrecta.");
                    }
                } else {
                    mostrarError(emailInput, emailError, "No se encontró ningún usuario con ese email.");
                }
            })
            .catch(error => {
                console.error("Error al iniciar sesión:", error);
                mostrarError(emailInput, emailError, "Ocurrió un error al intentar iniciar sesión.");
            });

    } else {
        loginSuccess.classList.remove("visible");
    }
});

function validarEmail(input, errorSpan) {
    var valor = input.value.trim();
    if (valor === "") {
        mostrarError(input, errorSpan, "El campo email no puede estar vacío");
        return false;
    }
    limpiarError(input, errorSpan);
    return true;
}

function validarPassword(input, errorSpan) {
    var valor = input.value;
    if (valor.length === 0) {
        mostrarError(input, errorSpan, "El campo contraseña no puede estar vacío");
        return false;
    }
    limpiarError(input, errorSpan);
    return true;
}

function mostrarError(input, errorSpan, mensaje) {
    input.classList.add("input--error");
    errorSpan.textContent = mensaje;
    errorSpan.classList.add("visible");
}

function limpiarError(input, errorSpan) {
    input.classList.remove("input--error");
    errorSpan.textContent = "";
    errorSpan.classList.remove("visible");
}
