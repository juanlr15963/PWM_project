document.addEventListener('click', function(event) {
    // Buscar si el clic fue en el botón toggle (o dentro de él)
    const toggleBtn = event.target.closest('#navbar-toggle');
    
    if (toggleBtn) {
        const mobileMenu = document.getElementById('navbar-mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('is-open');
        }
    }
});
