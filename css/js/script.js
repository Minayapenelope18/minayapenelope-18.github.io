// js/script.js

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    console.log('Inicializando modo oscuro...');
    
    if (!darkModeToggle) {
        console.error('No se encontró el botón de modo oscuro');
        return;
    }
    
    // Verificar preferencia guardada
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
    
    // Event listener para el toggle
    darkModeToggle.addEventListener('click', function() {
        console.log('Botón clickeado - Modo oscuro toggle');
        
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            console.log('Modo oscuro ACTIVADO');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
            console.log('Modo oscuro DESACTIVADO');
        }
    });
}

// Efectos hover para elementos destacados
function initializeHoverEffects() {
    const highlightItems = document.querySelectorAll('.highlight-item');
    if (highlightItems.length === 0) return;
    
    highlightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const isDarkMode = document.body.classList.contains('dark-mode');
            this.style.backgroundColor = isDarkMode 
                ? 'rgba(248, 210, 16, 0.06)' 
                : 'rgba(0, 104, 71, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Efectos adicionales para botones
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Navegación suave
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Validación de formularios
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        if (!nombre || !email || !mensaje) {
            showAlert('Por favor, completa todos los campos obligatorios.', 'warning');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Por favor, ingresa un correo electrónico válido.', 'warning');
            return;
        }
        
        // Simular envío exitoso
        showAlert('¡Gracias por contactarnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.', 'success');
        this.reset();
    });
}

// Función auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de alertas
function showAlert(message, type = 'info') {
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Posicionar la alerta
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.style.maxWidth = '500px';
    
    document.body.appendChild(alertDiv);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Efectos de animación al hacer scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.card, .highlight-item, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando funciones...');
    
    // Inicializar todas las funciones
    initializeDarkMode();
    initializeHoverEffects();
    initializeSmoothScroll();
    initializeFormValidation();
    initializeScrollAnimations();
    
    // Efecto especial para el botón de "Planifica tu Viaje"
    const planButton = document.querySelector('a[href="contacto.html"].btn-outline-light');
    if (planButton) {
        planButton.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('¡Gracias por tu interés! Serás redirigido a nuestra página de contacto para planificar tu viaje.', 'info');
            setTimeout(() => {
                window.location.href = 'contacto.html';
            }, 2000);
        });
    }
    
    console.log('Todas las funciones inicializadas correctamente');
});

// Función global para mostrar modales personalizados
function showCustomModal(title, content) {
    // Crear modal dinámicamente
    const modalHtml = `
        <div class="modal fade" id="customModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal anterior si existe
    const existingModal = document.getElementById('customModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar nuevo modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('customModal'));
    modal.show();
}