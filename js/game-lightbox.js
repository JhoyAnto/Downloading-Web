document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const screenshots = document.querySelectorAll('.game-screenshots img');

    let currentIndex = 0;

  // Abrir lightbox al hacer clic en un screenshot
    screenshots.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        lightboxImg.src = img.src;
        lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Bloquear scroll
    });
    });

  // Cerrar lightbox
    closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    });

  // Navegación entre imágenes
    prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    lightboxImg.src = screenshots[currentIndex].src;
    });

    nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % screenshots.length;
    lightboxImg.src = screenshots[currentIndex].src;
    });

  // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    });

  // Navegación con teclado
    document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
        prevBtn.click();
        } else if (e.key === 'ArrowRight') {
        nextBtn.click();
        } else if (e.key === 'Escape') {
        closeBtn.click();
        }
    }
    });
});