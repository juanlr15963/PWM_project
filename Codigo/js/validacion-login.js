document.addEventListener("DOMContentLoaded", function () {
    var btnLogin = document.getElementById("btn-login");
    if (!btnLogin) return;

    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var emailError = document.getElementById("email-error");
    var passwordError = document.getElementById("password-error");
    var loginSuccess = document.getElementById("login-success");

    btnLogin.addEventListener("click", function () {
        var emailValido = validarEmail(emailInput, emailError);
        var passwordValido = validarPassword(passwordInput, passwordError);

        if (emailValido && passwordValido) {
            loginSuccess.classList.add("visible");
            setTimeout(function () {
                window.location.href = "mi-espacio.html";
            }, 1000);
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

        if (valor.indexOf("@") === -1) {
            mostrarError(input, errorSpan, "Formato e-mail inválido, falta @");
            return false;
        }

        var regex = /^[^\s"]+@[^\s"]+\.[^\s"\/\\]+$/;
        if (!regex.test(valor)) {
            mostrarError(input, errorSpan, "Formato e-mail inválido (ejemplo: correo@dominio.com)");
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

        if (valor.length < 6) {
            mostrarError(input, errorSpan, "La contraseña debe tener al menos 6 caracteres");
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
});
