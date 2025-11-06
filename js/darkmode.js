// js/darkmode.js - VERSIÓN CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    console.log('Botón encontrado:', darkModeToggle);
    
    // Cargar estado anterior
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    }
    
    // Click event
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            console.log('Click en botón modo oscuro');
            
            if (body.classList.contains('dark-mode')) {
                // Cambiar a modo claro
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
                console.log('Cambiado a modo claro');
            } else {
                // Cambiar a modo oscuro
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
                console.log('Cambiado a modo oscuro');
            }
        });
    }
});

