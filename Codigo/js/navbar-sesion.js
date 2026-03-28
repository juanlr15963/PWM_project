// Función para configurar un botón de login/logout
function configurarBotonSesion(botonId) {
    var loginBtn = document.getElementById(botonId);
    if (!loginBtn) return false;

    var sesion = obtenerSesion();

    if (sesion) {
        loginBtn.textContent = "Cerrar Sesión";
        loginBtn.classList.add("navbar__auth-btn--logout");
        loginBtn.href = "#";
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault();
            cerrarSesion();
            window.location.href = "index.html";
        });
    } else {
        loginBtn.textContent = "Iniciar Sesión";
        loginBtn.classList.remove("navbar__auth-btn--logout");
        loginBtn.href = "login.html";
    }

    return true;
}

// Función para configurar el menú móvil según el estado de sesión
function configurarMenuMovil() {
    var mobileLinks = document.getElementById("navbar-mobile-links");
    var mobileAuth = document.getElementById("navbar-mobile-auth");

    if (!mobileLinks || !mobileAuth) return false;

    var sesion = obtenerSesion();
    mobileLinks.innerHTML = "";
    mobileAuth.innerHTML = "";

    if (sesion) {
        // Usuario logueado - mostrar opciones personales
        var opciones = [
            { texto: "Comunidad", url: "catalogo.html" },
            { texto: "Mis notas", url: "notas.html" },
            { texto: "Mi espacio", url: "mi-espacio.html" },
            { texto: "Laboratorio", url: "laboratorio.html" }
        ];

        opciones.forEach(function(opcion) {
            var link = document.createElement("a");
            link.href = opcion.url;
            link.textContent = opcion.texto;
            mobileLinks.appendChild(link);
        });

        // Botón de cerrar sesión
        var logoutBtn = document.createElement("a");
        logoutBtn.href = "#";
        logoutBtn.className = "navbar__auth-btn";
        logoutBtn.textContent = "Cerrar Sesión";
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            cerrarSesion();
            window.location.href = "index.html";
        });
        mobileAuth.appendChild(logoutBtn);
    } else {
        // Usuario sin login - mostrar opciones generales
        var opcionesPublicas = [
            { texto: "Catálogo", url: "catalogo.html" },
            { texto: "Laboratorio", url: "laboratorio.html" },
            { texto: "Notas", url: "notas.html" }
        ];

        opcionesPublicas.forEach(function(opcion) {
            var link = document.createElement("a");
            link.href = opcion.url;
            link.textContent = opcion.texto;
            mobileLinks.appendChild(link);
        });

        // Botón de iniciar sesión
        var loginBtn = document.createElement("a");
        loginBtn.href = "login.html";
        loginBtn.className = "navbar__auth-btn";
        loginBtn.textContent = "Iniciar Sesión";
        mobileAuth.appendChild(loginBtn);
    }

    return true;
}

// Intentar configurar el navbar
var navbarInterval = setInterval(function () {
    var desktopBtn = document.getElementById("navbar-login-btn-desktop");
    var mobileLinks = document.getElementById("navbar-mobile-links");

    // Solo continuar cuando al menos uno de los elementos exista
    if (!desktopBtn && !mobileLinks) return;

    clearInterval(navbarInterval);

    // Configurar botón desktop si existe
    if (desktopBtn) configurarBotonSesion("navbar-login-btn-desktop");

    // Configurar menú móvil
    configurarMenuMovil();
}, 100);
