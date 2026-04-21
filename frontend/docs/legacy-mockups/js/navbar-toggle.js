// Usar delegación de eventos en el documento para manejar clics
// incluso si el navbar se carga dinámicamente
(function() {
    document.addEventListener('click', function(event) {
        const toggleBtn = event.target.closest('#navbar-toggle');
        const mobileMenu = document.getElementById('navbar-mobile-menu');
        const userAvatar = event.target.closest('#navbar-user-avatar');
        const userDropdown = document.getElementById('navbar-user-dropdown');

        // Manejar menú móvil hamburguesa
        if (mobileMenu) {
            // Si se hace clic en el botón toggle
            if (toggleBtn) {
                event.stopPropagation();
                mobileMenu.classList.toggle('is-open');
                // Cerrar dropdown de usuario si está abierto
                if (userDropdown) userDropdown.classList.remove('is-open');
            }
            // Si se hace clic fuera del menú y el menú está abierto, cerrarlo
            else if (!event.target.closest('#navbar-mobile-menu') && !event.target.closest('#navbar-toggle')) {
                mobileMenu.classList.remove('is-open');
            }
        }

        // Manejar dropdown de usuario desktop
        if (userDropdown) {
            // Si se hace clic en el avatar
            if (userAvatar) {
                event.stopPropagation();
                userDropdown.classList.toggle('is-open');
                // Cerrar menú móvil si está abierto
                if (mobileMenu) mobileMenu.classList.remove('is-open');
            }
            // Si se hace clic fuera del dropdown y el dropdown está abierto, cerrarlo
            else if (!event.target.closest('.navbar__user-menu')) {
                userDropdown.classList.remove('is-open');
            }
        }
    });
})();
