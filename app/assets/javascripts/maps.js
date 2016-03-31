// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//

/*
// --- AJAX Prototying
var coordsArray = [[49.28113,-123.03621],[49.28113,-123.03747],[49.28113,-123.03880],[49.28063,-123.03880],[49.28022,-123.03880],[49.28022,-123.03754],[49.28022,-123.03623]];

function coords(c){
  if(c[0][0] == 4 ){
    c[0] = [20,30];
  }else{
    c[0] = [2,4];
  };
  document.getElementById("para").innerHTML = JSON.stringify(c);

  ctmp = c;
  return c;
};

$("document").ready(function() {

  $("#para").click(function() {
    $("#para").css("background-color", "cyan");
    var e = $('<p>Appended text </p>');
    $("#para").append(e);
    e.attr("id", "p2");
  });

  $("#bt").click(function(){
    var pack = JSON.stringify(ctmp);
    alert("data package: " + pack);
    $.ajax({
      type: "PATCH",
      url: "/map",
      data: {coords: pack},
      success: function(){
        alert("posted");
      },
      error: function(){
        alert("fail");
      }
    });
  });

});
// --- ---



// --- G-Maps API functions
var ctmp = [];

function coords(c){
  if(c[0][0] == 4 ){
    c[0] = [20,30];
  }else{
    c[0] = [2,4];
  };
  document.getElementById("para").innerHTML = JSON.stringify(c);

  ctmp = c;
  return c;
};

$("document").ready(function() {

  $("#para").click(function() {
    $("#para").css("background-color", "cyan");
    var e = $('<p>Appended text </p>');
    $("#para").append(e);
    e.attr("id", "p2");
  });
/*
  $("#bt").click(function(){
    var pack = JSON.stringify(ctmp);
    alert("data package: " + pack);
    $.ajax({
      type: "PATCH",
      url: "/course",
      data: {coords: pack},
      success: function(){
        alert("posted");
      },
      error: function(){
        alert("fail");
      }
    });
  });
*/
});

function initialize(){

  //setting up initial map of Vancouver
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.2827, lng: -123.1207},
    zoom: 18
  });

<<<<<<< HEAD

  var fixedCoordsArray = [];

  coords
=======
  //test course1: sfu parking lot by ASB  //passed
  var fixedCoordsArray = [
    {lat: 49.277575, lng: -122.912986},
    {lat: 49.277460, lng: -122.912310},
    {lat: 49.277365, lng: -122.911674}
  ];

/*
//Course 1: Hastings Community Park
var fixedCoordsArray = [
  {lat: 49.28113, lng: -123.03621}, //49.281095, -123.036216
  {lat: 49.28113, lng: -123.03747}, //49.281107, -123.037477
  {lat: 49.28113, lng: -123.03880}, //49.281112, -123.038783
  {lat: 49.28063, lng: -123.03880},  //49.280638, -123.038794
  {lat: 49.28022, lng: -123.03880}, //49.280229, -123.038787
  {lat: 49.28022, lng: -123.03754}, //49.280225, -123.037540
  {lat: 49.28022, lng: -123.03623} //49.280225, -123.036234
];
*/
>>>>>>> 32241b43c02b01c10572fbe56984cc44ef430ab2

  function coords(c){
  //    alert(c[0][1]);
  //    alert(c.length);

    for (i=0; i< c.length; i++){
  //    coordsArray[i] = "{lat:"+ c[i][0]+","+ "lng:" +c[i][1]+"}";
      fixedCoordsArray[i] = {lat: c[i][0] ,lng: c[i][1]};
    }
  //    alert(coordsArray);
  };
  //array of markers
  var markersArray = [];

  //creating a marker for each fixed coordinates in fixedCoordsArray
  for (i = 0; i < fixedCoordsArray.length; i++){
    var marker = new google.maps.Marker(
      { map: map,
        id: i,    //able to identify a specific marker to do stuff to
        position: fixedCoordsArray[i]
      }
    );

    //show infowindow to show where the start marker is
    if (i == 0){
          infoWindowStart = new google.maps.InfoWindow({map: map});
          infoWindowStart.setContent("Start");
          infoWindowStart.open(map, marker); //infowindow to indicate first marker
    }
    //show infowindow to show where the last marker is
    if (i == fixedCoordsArray.length - 1){
          infoWindowEnd = new google.maps.InfoWindow({map: map});
          infoWindowEnd.setContent("End");
          infoWindowEnd.open(map, marker); //infowindow to indicate last marker
    }

    markersArray.push(marker);                //marker added to array; able to identify
    marker.setPosition(fixedCoordsArray[i]);  //marker set on map
  }

  map.setCenter({lat: 49.28063, lng: -123.03754}); //center map around middle of the course: Hastings Park
//  map.setCenter(fixedCoordsArray[Math.floor(fixedCoordsArray.length /2)]); //center map to the median checkpoint //for ~linear courses

  //path of course drawn as polyline
  var coursePath = new google.maps.Polyline(
    {
      path: fixedCoordsArray,
      geodesic: true,
      strokeColor: '#808080',  //#808080 grey //#FF0000 red
      strokeOpacity: 1.0,
      strokeWeight: 4
    }
  );

  coursePath.setMap(map);   //sets the polyline on map

//////////////////////////////////////Note for Dan: ^^^^able to run independently; future refactoring////////////////////////

  var checkArray = [];  //stores all reached checkpoints to draw a polyline to all reached checkpoints
  var checked = 0;  //current index of fixedCoordsArray to compare to user's coords
  var userCoordsArray = []; //stores user's coordinates to draw polyline to all user coords

  var marker = new google.maps.Marker({map: map});  //create new marker object; this marker will move to the user's most recent coords

  repeatUpdatePos();

//var j = 0;  //for testing checkpoint reach

    //overall: 1)gets user's position, 2)display it, 3)draws polyline, 4)repeat
    function repeatUpdatePos(){
      //get user's coordinates
      if( navigator.geolocation ){
        navigator.geolocation.getCurrentPosition(showPosition, errorMessage); //user's coords are in an position object passed into the function showPosition
      }
      else{
        alert("Error: This browser does not support geolocation.");
      }

      //displays current user position and draws polyline
      function showPosition(position){
        //get the coords from the position object
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

//pos = fixedCoordsArray[j]; //for testing checkpoint reached

        userCoordsArray.push(pos);  //push coords into array
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png')
        marker.setPosition(pos);    //set marker at the coords
//#        map.setCenter(pos);         //center the map to the user coords   //currently disabled, because it's annoying when you are far from course

        //draws the path travelled so far by user
        var runningPath = new google.maps.Polyline({
          path: userCoordsArray,
          geodesic: true,
          strokeColor: '#3333CC', //line color: blue
          strokeOpacity: 1.0,
          strokeWeight: 4         //path travelled line is 1 unit thicker than course path
        });

        runningPath.setMap(map);  //set polyline on map

        //checks if a checkpoint is reached
        reachCheckpoint(pos);
//j = j+1;   //for testing checkpoint reach
      }

        //loops current function every interval (in ms); i.e. every cycle: get user position, store it into array, redraw polyline with new coords
        setTimeout(repeatUpdatePos,2000);

      function errorMessage(error){
        alert("Error: Location info is unavailable.");
      }
    }
    //checks if user has reached checkpoint
    function reachCheckpoint(pos){
      //if user's latitude and longitude matches to 5 decimal places of the checkpoint's, then checkpoint is declared reached
      if( pos.lat.toFixed(4) == fixedCoordsArray[checked].lat.toFixed(4) && pos.lng.toFixed(4) == fixedCoordsArray[checked].lng.toFixed(4) ){


        markersArray[checked].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');  //shows a green marker

        checkArray[checked] = fixedCoordsArray[checked]; //store reached checkpoint in this array
        checked = checked + 1;  //next time reachCheckpoint(pos) is called, it will compare current position with the next checkpoint not declared reached

        if(checked == 1){
              infoWindowStart.close(map, markersArray[0]); //get rid of start infowindow
        }

        //draws a new polyline that is blue between all reached checkpoints
        var checkPath = new google.maps.Polyline(
          {
            path: checkArray,
            geodesic: true,
            strokeColor: '#006633', //blue
            strokeOpacity: 1.0,
            strokeWeight: 2
          }
        );
        checkPath.setMap(map);  //set polyline on map

        //#FLAG THIS CHECKPOINT DATABASE#//

        if(checked == fixedCoordsArray.length ){  //if user has reached all checkpoints

          infoWindowEnd.close(map, markersArray[markersArray.length -1]);  //close infowindow displaying "end"

//          alert("Course Completed! Well Done!") //future: display big alert window to congratulate
          infoWindow = new google.maps.InfoWindow({map: map});
          infoWindow.setContent("Course Completed!");
          infoWindow.open(map, markersArray[markersArray.length -1]); //opens a infowindow ontop of the last marker

          coursePath.setMap(null); //removes the course path polyline (get rid of that red line entirely)

        }
      }
    }
  }
// --- ---
