document.addEventListener('DOMContentLoaded', () => {

    // --- Carrusel de Restaurantes ---
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselItems = document.querySelectorAll('.restaurante-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let currentIndex = 0;
    const totalSlides = carouselItems.length;
    let slideWidth = 0; // Inicializar ancho

    function updateCarousel() {
        const containerWidth = carouselSlide.parentElement.clientWidth;
        
        // Determinar el ancho del slide basado en el tamaño de la pantalla
        const breakpointMd = 768; 
        
        if (window.innerWidth < breakpointMd) {
            // En pantallas pequeñas, asumimos que se muestra 1 ítem a la vez
            slideWidth = containerWidth; // El ancho del slide es el ancho del contenedor
        } else {
            // En pantallas medianas/grandes, se muestran 3 ítems, así que el ancho de un ítem es 1/3 del contenedor
            // Pero el `transform` debe basarse en el ancho de UN ítem
            slideWidth = containerWidth / 3;
        }

        // Aplica la transformación
        carouselSlide.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    }

    // Botón Siguiente
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= totalSlides) {
            currentIndex = 0; // Vuelve al principio para un bucle infinito
        }
        updateCarousel();
    });

    // Botón Anterior
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1; // Va al final para un bucle infinito
        }
        updateCarousel();
    });

    // Actualiza el carrusel al redimensionar la ventana
    // Usar un 'debounce' puede mejorar el rendimiento si hay muchos redimensionamientos rápidos
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateCarousel, 150); // Espera 150ms después de la última redimensión
    });

    // Ejecuta la actualización inicial para posicionar correctamente
    updateCarousel();
});
