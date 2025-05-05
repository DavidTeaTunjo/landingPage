let originsData = [];

function initOriginsMap() {
  originsData.forEach(origin => {
    const mapDiv = document.getElementById('map-' + origin.id);
    if (mapDiv) {
      const map = new google.maps.Map(mapDiv, {
        center: origin.location,
        zoom: 11,
        mapTypeId: 'terrain',
        disableDefaultUI: true
      });
      new google.maps.Marker({
        position: origin.location,
        map: map,
        title: origin.name
      });
    }
  });
}

fetch('json/origins.json')
  .then(response => response.json())
  .then(data => {
    originsData = data.origins;
    const originsList = document.getElementById('origins-list');
    data.origins.forEach(origin => {
      // Contenedor principal
      const originDiv = document.createElement('div');
      originDiv.className = 'origin-card';

      // Imagen
      const img = document.createElement('img');
      img.src = origin.UrlImage;
      img.alt = origin.name;
      img.className = 'origin-image';

      // Nombre
      const title = document.createElement('h3');
      title.textContent = origin.name;
      title.className = 'origin-title';

      // Descripción
      const desc = document.createElement('p');
      desc.textContent = origin.description;
      desc.className = 'origin-description';

      // Mapa
      const mapDiv = document.createElement('div');
      mapDiv.className = 'origin-map';
      mapDiv.id = 'map-' + origin.id;

      // Estructura
      originDiv.appendChild(img);
      originDiv.appendChild(title);
      originDiv.appendChild(desc);
      originDiv.appendChild(mapDiv);

      originsList.appendChild(originDiv);
    });
    // Si Google Maps ya cargó, inicializa los mapas
    if (window.google && window.google.maps) {
      initOriginsMap();
    }
  });
