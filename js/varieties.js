let varietiesData = [];
let currentIndex = 0;

// Cargar el JSON de variedades
fetch('json/varieties.json')
  .then(res => res.json())
  .then(data => {
    varietiesData = data.varieties;
    renderCarousel();
    renderDescription();
  });

function renderCarousel() {
  const track = document.getElementById('carouselTrack');
  track.innerHTML = '';

  // Mostrar la tarjeta central y las dos laterales (si existen)
  for (let offset = -1; offset <= 1; offset++) {
    let idx = (currentIndex + offset + varietiesData.length) % varietiesData.length;
    const variety = varietiesData[idx];
    const card = document.createElement('div');
    card.className = 'carousel-card' + (offset === 0 ? ' center' : '');
    card.innerHTML = `
      <img src="${variety.UrlImage}" alt="${variety.name}"> `;
    if (offset !== 0) {
      card.addEventListener('click', () => {
        currentIndex = idx;
        renderCarousel();
        renderDescription();
      });
    }
    track.appendChild(card);
  }
}

function renderDescription() {
  const desc = document.getElementById('carouselDescription');
  const variety = varietiesData[currentIndex];
  desc.innerHTML = `
    <h2>${variety.name}</h2>
    <p>Process:  ${variety.process}</p>
    <p>Score: ${variety.cupScore}</p>
    <p>${variety.description}</p>
  `;
}

// Botones de navegación
document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + varietiesData.length) % varietiesData.length;
  renderCarousel();
  renderDescription();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % varietiesData.length;
  renderCarousel();
  renderDescription();
});
