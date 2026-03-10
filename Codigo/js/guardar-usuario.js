function guardarSesionUsuario(email, password) {
    var sesion = {
        email: email,
        password: password,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("micolonia_sesion", JSON.stringify(sesion));
    return Promise.resolve();
}
