// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


var keepRunning = 0; //flag for ending js when user leaves map view. 0 = run, 1 = exit.

function runMode(){ // views that are accessible from map view will call this function to end js script
  keepRunning = 1;
//  alert("runmode");
};

var coordsArray = [];
var map;

function coords(n, c){

  if (c != null){ //deals with clicking the 'popular maps' link which does not pass coords

    for (i=0; i< c.length; i++){
//    coordsArray[i] = "{lat:"+ c[i][0]+","+ "lng:" +c[i][1]+"}";
      coordsArray[i] = {lat: c[i][0] ,lng: c[i][1]};
    }
  }

  initialize(n);
};

function initialize(n){
  var zoomzoom = 17; //amount of zoom-in on map to display course

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
  keepRunning = 0;

  //array of markers
  var markersArray = [];

  //creating a marker for each fixed coordinates in fixedCoordsArray
  for (i = 0; i < coordsArray.length; i++){
    var marker = new google.maps.Marker(
      { map: map,
        id: i,    //able to identify a specific marker to do stuff to
        position: coordsArray[i]
      }
    );

    //show infowindow to show where the start marker is
    if (i == 0){
          infoWindowStart = new google.maps.InfoWindow({map: map});
          infoWindowStart.setContent("Start");
          infoWindowStart.open(map, marker); //infowindow to indicate first marker
    }
    //show infowindow to show where the last marker is
    if (i == coordsArray.length - 1){
          infoWindowEnd = new google.maps.InfoWindow({map: map});
          infoWindowEnd.setContent("End");
          infoWindowEnd.open(map, marker); //infowindow to indicate last marker
    }

    markersArray.push(marker);
    marker.setPosition(coordsArray[i]);
  }

  map.setCenter(coordsArray[Math.floor(coordsArray.length /2)]); //center map to the median checkpoint //for ~linear courses

  //path of course drawn as polyline
  var coursePath = new google.maps.Polyline(
    {
      path: coordsArray,
      geodesic: true,
      strokeColor: '#808080',  //#808080 grey
      strokeOpacity: 1.0,
      strokeWeight: 4,
      map: map
    }
  );
//////////////////////////////////////#########################################################################
/*
function zoom() {
  var bounds = new google.maps.LatLngBounds();
  for(var i = 0; i < coordsArray.length; i++){
    bounds.extend(coordsArray[i]);

  }

  map.fitBounds(bounds);
}
*/
//////////////////////////////////////////////////////##################################################################
  var checkArray = [];  //stores all reached checkpoints to draw a polyline to all reached checkpoints
  var checked = 0;  //current index of coordsArray to compare to user's coords
  var userCoordsArray = []; //stores user's coordinates to draw polyline to all user coords

  var marker = new google.maps.Marker({map: map});  //create new marker object; this marker will move to the user's most recent coords

  var repeater = setInterval(function(){repeatUpdatePos()},2000);
//  repeatUpdatePos();

//var j = 0;  //for testing checkpoint reach

    //overall: 1)gets user's position, 2)display it, 3)draws polyline, 4)repeat
    function repeatUpdatePos(){

      //checks if js should stop executing
      if(keepRunning == 1){
        return;
      }

      //get user's coordinates
      if( navigator.geolocation ){
        navigator.geolocation.getCurrentPosition(showPosition, errorMessage);
      }
      else{
        alert("Error: This browser does not support geolocation.");
      }

      //displays current user position and draws polyline
      function showPosition(position){
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

//pos = coordsArray[j]; //for testing checkpoint reached

        userCoordsArray.push(pos);
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png')
        marker.setPosition(pos);
//#        map.setCenter(pos);         //center the map to the user coords   //currently disabled, because it's annoying when you are far from course

        //draws the path travelled so far by user
        var runningPath = new google.maps.Polyline({
          path: userCoordsArray,
          geodesic: true,
          strokeColor: '#3333CC', //line color: blue
          strokeOpacity: 1.0,
          strokeWeight: 4,
          map: map
        });

        //checks if a checkpoint is reached
        reachCheckpoint(pos);
//j = j+1;   //for testing checkpoint reach
      }
        //loops current function every interval (in ms); i.e. every cycle: get user position, store it into array, redraw polyline with new coords
        setTimeout(repeatUpdatePos,5000);

      function errorMessage(error){
        alert("Error: Location info is unavailable.");
      }
    }

//    repeater = setTimeout(repeatUpdatePos,2000);
    //checks if user has reached checkpoint
    function reachCheckpoint(pos){

      //if user's latitude and longitude matches to 4 decimal places of the checkpoint's, then checkpoint is declared reached
      if( pos.lat.toFixed(4) == coordsArray[checked].lat.toFixed(4) && pos.lng.toFixed(4) == coordsArray[checked].lng.toFixed(4) ){

        markersArray[checked].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');  //shows a green marker

        checkArray[checked] = coordsArray[checked];
        checked = checked + 1;  //next time reachCheckpoint(pos) is called, it will compare current position with the next checkpoint not declared reached

        if(checked == 1){
              //get rid of start infowindow
              infoWindowStart.close(map, markersArray[0]);
        }

        //erase the user polyline from previous checkpoint to current
        userCoordsArray.length = 0;
        userCoordsArray[0] = coordsArray[checked]; //user polyline will now start at current checkpoint

        //draws a polyline between all reached checkpoints
        var checkPath = new google.maps.Polyline(
          {
            path: checkArray,
            geodesic: true,
            strokeColor: '#006633', //blue
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
          }
        );

        //#FLAG THIS CHECKPOINT DATABASE#//
        $.ajax({
          type: "POST",
          url: "/progresses",
          data: {name: n, count: checked, done: false},
          success: function(){
            alert("posted");
          },
          //error: function(){
          //  alert("fail");
          //}
        });
        console.log("checed: " + checked)

        //if user has reached all checkpoints
        if(checked == coordsArray.length ){
          $.ajax({
            type: "POST",
            url: "/progresses",
            data: {name: n, count: checked, done: true},
            success: function(){
              alert("posted");
            },
            //error: function(){
            //  alert("fail");
            //}
          });
          //stops timer
          clearTimer();

          //stops updating map
          clearInterval(repeater);
//          runMode();

          infoWindowEnd.close(map, markersArray[markersArray.length -1]);  //close infowindow displaying "end"

          alert("Course Completed! Well Done!") //future: display big alert window to congratulate
          infoWindow = new google.maps.InfoWindow({map: map});
          infoWindow.setContent("Course Completed!");
          infoWindow.open(map, markersArray[markersArray.length -1]); //opens a infowindow ontop of the last marker

          //removes the course path polyline
          coursePath.setMap(null);
        }
      }
    }
  };
// --- ---
