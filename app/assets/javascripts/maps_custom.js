//for custom map making

function initialize(){

  //array to store checkpoints
  var coordsArray = [];

  //setting up initial map of Vancouver region
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.28, lng: -123.12},
    zoom: 18
  });

  var marker = new google.maps.Marker({map: map});

  if( navigator.geolocation ){
    navigator.geolocation.getCurrentPosition(showPosition, errorMessage);
  }
  else{
    alert("Error: This browser does not support geolocation.");
  //  infoWindow.setContent("X This browser does not support geolocation."); //either this or the alert above
  }
///////////////////////////////////////
  //marker counter
  var count = 0;
  //left clicking creates a marker on spot
  google.maps.event.addListener(map, "click", function (event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();

    //object to track a marker and it's coordinates
    markCoords = {
      var marker = new google.maps.Marker(
        { map: map
      });

      pos = {
        lat: latitude,
        lng: longitude
      }
    };
    coordsArray.push(markCoords);

    marker.setPosition(coordsArray[i].pos);
    map.setCenter(coordsArray[i].pos);

    //draws polyline to connect the markers sequentially
/*    var runningPath = new google.maps.Polyline({
      path: coordsArray,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    runningPath.setMap(map);
*/
    i = i + 1;
  });
////////////////////////////////working on this section////////////////////////////////////
  //creates a infoWindow object. Note only need this one window. Same contents for all markers.
//  var infoWindowPop = new google.maps.infoWindow({map: map});
//  infoWindowPop.setContent("testing");
  //actions that can coccur when clicking a marker ((Dan is working on this atm))
/*  google.maps.event.addListener(marker,'click',function() {
      infoWindowPop.open(map, marker);
    }
  );
*/
/*  marker.addListener('click', function() {
    infowindow.open(map, marker);

   });
*/
/////////////////////////////////////////////////////////////////////////////////////////
  function showPosition(position){
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map.setCenter(pos);
  }

  function errorMessage(error){
    alert("Error: Location info is unavailable.");
  //  infoWindow.setContent("X Location info is unavailable."); //either this or the alert above
  };
}
