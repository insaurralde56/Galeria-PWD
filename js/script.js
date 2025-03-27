document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const thumbnails = document.getElementById('thumbnails');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.slide');
    const thumbnailItems = document.querySelectorAll('.thumbnail');

    // Elementos de pantalla completa
    const fullscreenOverlay = document.getElementById('fullscreen-overlay');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeFullscreenBtn = document.getElementById('close-fullscreen');
    const prevFullscreenBtn = document.querySelector('.prev-fullscreen-btn');
    const nextFullscreenBtn = document.querySelector('.next-fullscreen-btn');

    // Tema oscuro
    const btnTheme = document.querySelector('.btn-theme');
    
    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Cambiar ícono de tema
        btnTheme.textContent = document.body.classList.contains('dark-theme') 
            ? '☀️ Tema claro' 
            : '🌙 Tema oscuro';
    });

    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar miniaturas activas
        thumbnailItems.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Eventos para botones de navegación del slider principal
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Eventos para miniaturas
    thumbnailItems.forEach((thumb, index) => {
        thumb.addEventListener('click', () => goToSlide(index));
    });

    // Desplazamiento automático
    const autoSlideInterval = setInterval(nextSlide, 3000);

    // Funcionalidad de pantalla completa
    function openFullscreen(index) {
        const imgSrc = slides[index].querySelector('img').src;
        fullscreenImage.src = imgSrc;
        fullscreenOverlay.style.display = 'flex';
        currentIndex = index;
    }

    function closeFullscreen() {
        fullscreenOverlay.style.display = 'none';
    }

    // Abrir pantalla completa desde slider y miniaturas
    slides.forEach((slide, index) => {
        slide.querySelector('img').addEventListener('click', () => openFullscreen(index));
    });

    thumbnailItems.forEach((thumb, index) => {
        thumb.querySelector('img').addEventListener('click', () => openFullscreen(index));
    });

    // Botones de navegación en pantalla completa
    closeFullscreenBtn.addEventListener('click', closeFullscreen);

    nextFullscreenBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        fullscreenImage.src = slides[currentIndex].querySelector('img').src;
    });

    prevFullscreenBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        fullscreenImage.src = slides[currentIndex].querySelector('img').src;
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    });
});