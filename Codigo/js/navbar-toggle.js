// Usar delegación de eventos en el documento para manejar clics
// incluso si el navbar se carga dinámicamente
(function() {
    document.addEventListener('click', function(event) {
        const toggleBtn = event.target.closest('#navbar-toggle');
        const mobileMenu = document.getElementById('navbar-mobile-menu');

        if (!mobileMenu) return;

        // Si se hace clic en el botón toggle
        if (toggleBtn) {
            event.stopPropagation();
            mobileMenu.classList.toggle('is-open');
        }
        // Si se hace clic fuera del menú y el menú está abierto, cerrarlo
        else if (!event.target.closest('#navbar-mobile-menu') && !event.target.closest('#navbar-toggle')) {
            mobileMenu.classList.remove('is-open');
        }
    });
})();
