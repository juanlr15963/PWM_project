document.addEventListener("xlu:done", function () {
    var loginBtn = document.getElementById("navbar-login-btn");
    if (!loginBtn) return;

    var sesion = obtenerSesion();

    if (sesion) {
        loginBtn.textContent = "Log-out";
        loginBtn.classList.add("navbar__auth-btn--logout");
        loginBtn.href = "#";
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault();
            cerrarSesion();
            window.location.href = "index.html";
        });
    }
});
