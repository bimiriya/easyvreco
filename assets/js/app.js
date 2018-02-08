var map;
// INICIALIZAR MAPA
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: { lat: -33.4533624, lng: -70.7142131 }
  });

  document.getElementById('ubication').addEventListener('click', searchMe);
  document.getElementById('btn-ruta').addEventListener('click', calculateAndDisplayRoute);


  let infoWindow = new google.maps.InfoWindow({ map: map });

  let autocompleteA = document.getElementById('origin');
  const searchA = new google.maps.places.Autocomplete(autocompleteA);
  searchA.bindTo('bounds', map);

  let autocompleteB = document.getElementById('destiny');
  const searchB = new google.maps.places.Autocomplete(autocompleteB);
  searchB.bindTo('bounds', map);

  // BUSCA MI UBICACION
  function searchMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let option = {
          center: pos,
          zoom: 18
        }
        map.setCenter(pos);
        const marker = new google.maps.Marker({
          position: pos,
          map: map,
        });
        let text = '<h1>Nombre del lugar</h1>' + '<p>Descripción del lugar</p>' + '<a href="#">Página web</a>';
        let information = new google.maps.InfoWindow({
          content: text
        });

        marker.addListener('click', function () {
          information.open(map, marker);
        });
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }
  }
}

// ENCUENTRA LA RUTA
function calculateAndDisplayRoute() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  let selectedMode = document.getElementById('mode').value;

  let objDR = {
    origin: document.getElementById('origin').value,
    destination: document.getElementById('destiny').value,
    travelMode: google.maps.TravelMode[selectedMode],
  }
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: { lat: -33.4533624, lng: -70.7142131 }
  });

  directionsService.route(objDR, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setMap(map);
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
let removeOrigin = document.getElementById('remove-origin');
removeOrigin.addEventListener('click', function () {
  document.getElementById('origin').value = '';
});
let removeDestiny = document.getElementById('remove-destiny');
removeDestiny.addEventListener('click', function () {
  document.getElementById('destiny').value = '';
});

var granimInstance = new Granim({
  element: '#canvas-basic',
  name: 'basic-gradient',
  direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
  opacity: [1, 1],
  isPausedWhenNotInView: true,
  states: {
    "default-state": {
      gradients: [
        ['#AA076B', '#61045F'],
        ['#02AAB0', '#00CDAC'],
        ['#DA22FF', '#9733EE']
      ]
    }
  }
});