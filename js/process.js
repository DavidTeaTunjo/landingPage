document.addEventListener('DOMContentLoaded', () => {
    const procTrack = document.getElementById('procTrack');
    const procPrev = document.getElementById('procPrev');
    const procNext = document.getElementById('procNext');
    const cards = procTrack.querySelectorAll('.process-card');
  
    // Calcula el desplazamiento igual al ancho de una tarjeta (más el gap)
    let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(procTrack).gap || 0);
  
    // Actualiza el ancho de la tarjeta si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
      cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(procTrack).gap || 0);
    });
  
    procPrev.addEventListener('click', () => {
      procTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  
    procNext.addEventListener('click', () => {
      procTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  });
  
  