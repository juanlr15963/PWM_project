function guardarSesionUsuario(email, password) {
    var sesion = {
        email: email,
        password: password,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("micolonia_sesion", JSON.stringify(sesion));
    return Promise.resolve();
}

function obtenerSesion() {
    var data = localStorage.getItem("micolonia_sesion");
    return data ? JSON.parse(data) : null;
}

function cerrarSesion() {
    localStorage.removeItem("micolonia_sesion");
}
