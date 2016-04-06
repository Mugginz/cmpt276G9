// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

var keepRunning = 0; //flag for ending js when user leaves map view. 0 = runnable, 1 = exit.

var coordsArray = [];
var map;
var repeater;

function coords(n, c){

  //deals with clicking the 'popular maps' link which does not pass coords
  if (c != null){
    for (i=0; i< c.length; i++){
      coordsArray[i] = {lat: c[i][0] ,lng: c[i][1]};
    }
  }

  //add click listeners for all links on course view to clear this script
  var leaveMaps = document.querySelectorAll('.leaveCoursesView');
  for (var i = 0; i < leaveMaps.length; i++){
    leaveMaps[i].addEventListener('click', function(){
        keepRunning = 1;
        clearInterval(repeater);
      });
  }

  initialize(n);
};

function initialize(n){

  var markersArray = [];
  var zoomzoom = 17;
  keepRunning = 0;

  //upon viewing maps#course first time, there are no coords in coordsArray, so just render map of Vancouver
  if(coordsArray.length < 1 || coordsArray == null){
    zoomzoom = 12;
  }

  //setting up initial map of Vancouver
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.2827, lng: -123.1207},
    zoom: zoomzoom
  });

  if(coordsArray.length < 1 || coordsArray == null){
    return;
  }

  //creating a marker for each fixed coordinates in coordsArray
  for (i = 0; i < coordsArray.length; i++){
    var marker = new google.maps.Marker(
      { map: map,
        id: i,
        position: coordsArray[i]
      }
    );

  //infowindow to show where the start marker is
    if (i == 0){
      infoWindowStart = new google.maps.InfoWindow({map: map});
      infoWindowStart.setContent("Start");
      infoWindowStart.open(map, marker);
    }

    //infowindow to show where the last marker is
    if (i == coordsArray.length - 1){
      infoWindowEnd = new google.maps.InfoWindow({map: map});
      infoWindowEnd.setContent("End");
      infoWindowEnd.open(map, marker);
    }

    markersArray.push(marker);
    marker.setPosition(coordsArray[i]);
  }

  //course path drawn as polyline
  var coursePath = new google.maps.Polyline({
    path: coordsArray,
    geodesic: true,
    strokeColor: '#808080', //grey
    strokeOpacity: 1.0,
    strokeWeight: 5,
    map: map
  });

  //fit the whole course on the map screen
  var bounds = new google.maps.LatLngBounds();
  for(var i = 0; i < coordsArray.length; i++){
    var someLatLng = new google.maps.LatLng(coordsArray[i]);
    bounds.extend(someLatLng);
  }
  map.fitBounds(bounds);


  var checkArray = [];  //stores all reached checkpoints to draw a polyline to all reached checkpoints
  var checked = 0;  //current index of coordsArray to compare to user's coords
  var userCoordsArray = []; //stores user's coordinates to draw polyline of user coords

  var marker = new google.maps.Marker({map: map});  //marker of user's current coords
//var j = 0; // --- Autocompleting for demo ---//

    //loops current function every interval (in ms)
  repeater = setInterval(function(){repeatUpdatePos()},3000);

  //gets user's position, display it, draws polyline
  function repeatUpdatePos(){

    //checks if js should stop executing
    if(keepRunning == 1){
      clearInterval(repeater);
      return;
    }

    //get user's coordinates
    if( navigator.geolocation ){
      navigator.geolocation.getCurrentPosition(showPosition, errorMessage);
    }
    else{
      alert("Error: This browser does not support geolocation.");
    }
    function showPosition(position){
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
//pos = coordsArray[j]; // --- Autocompleting for demo --- //

      userCoordsArray.push(pos);
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png'); //user position on map represented by purple marker
      marker.setPosition(pos);

      //draws the path travelled by user
      var runningPath = new google.maps.Polyline({
        path: userCoordsArray,
        geodesic: true,
        strokeColor: '#3333CC', //blue
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: map
      });

      reachCheckpoint(pos);
//j++; // --- Autocompleting for demo --- //
    }

    function errorMessage(error){
      console.log("Error: Location info is unavailable.");
    }
  }

    //checks if user has reached checkpoint
    function reachCheckpoint(pos){

      //if user's latitude and longitude matches to 4 decimal places of the checkpoint's, then checkpoint is declared reached
      if( pos.lat.toFixed(4) == coordsArray[checked].lat.toFixed(4) && pos.lng.toFixed(4) == coordsArray[checked].lng.toFixed(4) ){

        markersArray[checked].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');  //reached checkpoint represented by green marker

        checkArray[checked] = coordsArray[checked];
        checked = checked + 1;

        if(checked == 1){
          infoWindowStart.close(map, markersArray[0]);
        }

        //erase the user polyline from previous checkpoint to current (because too 'noisy')
        userCoordsArray.length = 0;
        userCoordsArray[0] = coordsArray[checked]; //user polyline will now start at current checkpoint

        //draws a polyline between all reached checkpoints
        var checkPath = new google.maps.Polyline({
          path: checkArray,
          geodesic: true,
          strokeColor: '#006633', //blue
          strokeOpacity: 1.0,
          strokeWeight: 5,
          map: map
        });

        //updating database that user has reached this checkpoint
        $.ajax({
          type: "POST",
          url: "/progresses",
          data: {name: n, count: checked, done: false},
          success: function(){
          },
        });
        console.log("checed: " + checked)

        //if user has reached all checkpoints
        if(checked == coordsArray.length ){
          $.ajax({
            type: "POST",
            url: "/progresses",
            data: {name: n, count: checked, done: true},
            success: function(){
            },
          });

          //stops timer
          clearTimer();

          //stops updating map
          clearInterval(repeater);

          alert("Course Completed! Well Done!")

          infoWindowEnd.setContent("Course Completed!");

          //removes the course path polyline
          coursePath.setMap(null);
        }
      }
    }
  };
