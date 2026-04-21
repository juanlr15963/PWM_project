// Función para configurar el área de autenticación desktop
function configurarAuthDesktop() {
    var authContainer = document.getElementById("navbar-auth-desktop");
    if (!authContainer) return false;

    var sesion = obtenerSesion();
    authContainer.innerHTML = "";

    if (sesion) {
        // Usuario logueado - mostrar avatar con dropdown
        var userMenuContainer = document.createElement("div");
        userMenuContainer.className = "navbar__user-menu";

        // Avatar button
        var avatarBtn = document.createElement("button");
        avatarBtn.className = "navbar__user-avatar";
        avatarBtn.id = "navbar-user-avatar";
        avatarBtn.setAttribute("aria-label", "Menú de usuario");
        avatarBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';

        // Dropdown menu
        var dropdown = document.createElement("div");
        dropdown.className = "navbar__user-dropdown";
        dropdown.id = "navbar-user-dropdown";

        var miEspacioLink = document.createElement("a");
        miEspacioLink.href = "mi-espacio.html";
        miEspacioLink.textContent = "Mi espacio";

        var logoutLink = document.createElement("a");
        logoutLink.href = "#";
        logoutLink.textContent = "Cerrar sesión";
        logoutLink.addEventListener("click", function(e) {
            e.preventDefault();
            cerrarSesion();
            window.location.href = "index.html";
        });

        dropdown.appendChild(miEspacioLink);
        dropdown.appendChild(logoutLink);

        userMenuContainer.appendChild(avatarBtn);
        userMenuContainer.appendChild(dropdown);
        authContainer.appendChild(userMenuContainer);
    } else {
        // Usuario sin login - mostrar botón de login
        var loginBtn = document.createElement("a");
        loginBtn.href = "login.html";
        loginBtn.className = "navbar__auth-btn";
        loginBtn.textContent = "Iniciar Sesión";
        authContainer.appendChild(loginBtn);
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
    var desktopAuth = document.getElementById("navbar-auth-desktop");
    var mobileLinks = document.getElementById("navbar-mobile-links");

    // Solo continuar cuando al menos uno de los elementos exista
    if (!desktopAuth && !mobileLinks) return;

    clearInterval(navbarInterval);

    // Configurar auth desktop si existe
    if (desktopAuth) configurarAuthDesktop();

    // Configurar menú móvil
    configurarMenuMovil();
}, 100);
