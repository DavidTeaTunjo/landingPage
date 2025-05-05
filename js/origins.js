let originsData = [];

function showMapForOrigin(origin) {
  const originsMaps = document.getElementById("origins-maps");
  originsMaps.innerHTML = ''; // Limpia el contenedor

  // Crea el div del mapa
  const mapDiv = document.createElement("div");
  mapDiv.className = "origin-map";
  mapDiv.id = "map-" + origin.id;
  originsMaps.appendChild(mapDiv);

  // Inicializa el mapa con Leaflet
  const map = L.map(mapDiv).setView([origin.location.lat, origin.location.lng], 11);

  // Añade la capa de OpenStreetMap
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Añade el marcador
  L.marker([origin.location.lat, origin.location.lng])
    .addTo(map)
    .bindPopup(origin.name);
}

// Utilidad: ¿es visible (aunque sea parcialmente) en el contenedor?
function isVisible(ele, container) {
  const eleRect = ele.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return (
    eleRect.bottom > containerRect.top &&
    eleRect.top < containerRect.bottom
  );
}

fetch("json/origins.json")
  .then((response) => response.json())
  .then((data) => {
    originsData = data.origins;
    const originsList = document.getElementById("origins-list");

    data.origins.forEach((origin) => {
      // Contenedor principal
      const originDiv = document.createElement("div");
      originDiv.className = "origin-card";

      // Imagen
      const img = document.createElement("img");
      img.src = origin.UrlImage;
      img.alt = origin.name;
      img.className = "origin-image";

      // Nombre
      const title = document.createElement("h3");
      title.textContent = origin.name;
      title.className = "origin-title";

      // Descripción
      const desc = document.createElement("p");
      desc.textContent = origin.description;
      desc.className = "origin-description";

      // Estructura
      originDiv.appendChild(img);
      originDiv.appendChild(title);
      originDiv.appendChild(desc);

      originsList.appendChild(originDiv);
    });

    // Mostrar el mapa del primer origen al cargar
    if (originsData.length > 0) {
      showMapForOrigin(originsData[0]);
    }

    // Manejar el scroll para mostrar el mapa del primer origen visible
    originsList.addEventListener('scroll', () => {
      const originCards = originsList.children;
      const originsDataIni = originsData[0]
      for (let i = 0; i < originCards.length; i++) {
        console.log(originCards[i]);
        
        if (isVisible(originCards[i], originsList)) {
          if (originsDataIni != originsData[i]){
             showMapForOrigin(originsData[i]);
             originsDataIni = originsData[i];
          }else{
            showMapForOrigin(originsData[0]);
          }
          
          break;
        }
      }
    });
  });
