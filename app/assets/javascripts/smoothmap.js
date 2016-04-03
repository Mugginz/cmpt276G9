function coords2(){
  alert("test");
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: 49.28113, lng: -123.03621}
    });
    directionsDisplay.setMap(map);

      calculateAndDisplayRoute(directionsService, directionsDisplay);

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: {lat: 49.28113, lng: -123.03621},//new google.maps.LatLng(49.268623, -123.186312),//{lat: 49.28113, lng: -123.03621},
      destination: {lat: 49.28022, lng: -123.03880},//new google.maps.LatLng(49.264536, -123.168479),//{lat: 49.28022, lng: -123.03880},
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
      else {
        alert('Directions request failed due to ' + status);
      }
    });
  }
}
