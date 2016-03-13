# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
`
//This is a fixed course. User must start at first marker, and vsiit each checkpoint in order, else checkpoints will not register when reached.
/*to implement: -identify start and end markers. (later update: markers display numbers)
                -do not draw polyline if user does not begin at first marker. i.e. don't draw line as user is heading to the course
                -turn invisible markers that are not checkpoints (so more markers can be used to make course more smooth)
*/
/*'maybe' issues: 1) Actual user travelled path will not match exactly with course path, thus results in displaying 2 paths between checkpoints.
                    Solution: Upon reaching checkpoint: a) replace actual travelled path with the course path segment of green color.
                                                        b) keep actual user travelled path; only replace when user refresh page.
                          current implementation -->    c) keep actual user travelled path, and show green course path segment. (Too messy?)
*/
function initialize(){

  //setting up initial map of Vancouver
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.2827, lng: -123.1207},
    zoom: 18
  });

  /*adding fixed coordinates to array; current course is the perimeter of Hastings Community Park, E. Vancouver.
  Feel free to change these coords for your own testing location.
  Note: fixed coords need to have at least 5 decimal places. This will allow accuracy to within
  */
/*  var fixedCoordsArray = [
    {lat: 49.280229, lng: -123.038787}, //49.280229, -123.038787
    {lat: 49.280225, lng: -123.037540}, //49.280225, -123.037540
    {lat: 49.280225, lng: -123.036234}, //49.280225, -123.036234
    {lat: 49.280647, lng: -123.036221}, //49.280647, -123.036221
    {lat: 49.281095, lng: -123.036216}, //49.281095, -123.036216
    {lat: 49.281107, lng: -123.037477}, //49.281107, -123.037477
    {lat: 49.281112, lng: -123.038783}, //49.281112, -123.038783
    {lat: 49.280638, lng: -123.038794}  //49.280638, -123.038794
  ];
*/
  /*Course: Rupert Park */
/*  var fixedCoordsArray = [
    {lat: 49.273140, lng: -123.033493},
    {lat: 49.272269, lng: -123.033475},
    {lat: 49.271382, lng: -123.033296},
    {lat: 49.271401, lng: -123.032658},
    {lat: 49.270703, lng: -123.032465},
    {lat: 49.270071, lng: -123.031059},
    {lat: 49.270880, lng: -123.030945},
    {lat: 49.271609, lng: -123.031136},
    {lat: 49.271420, lng: -123.032657},
    {lat: 49.271344, lng: -123.033539}
  ];
*/
  //test course1: sfu parking lot by ASB
  var fixedCoordsArray = [
    {lat: 49.277575, lng: -122.912986},
    {lat: 49.277460, lng: -122.912310},
    {lat: 49.277365, lng: -122.911674}
  ];


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

    markersArray.push(marker);                //marker added to array; able to identify
    marker.setPosition(fixedCoordsArray[i]);  //marker set on map
  }

//  map.setCenter({lat: 49.28063, lng: -123.03754}); //center map around middle of the course
map.setCenter(fixedCoordsArray[1]); //for test course1

  //path of course drawn as polyline
  var coursePath = new google.maps.Polyline(
    {
      path: fixedCoordsArray,
      geodesic: true,
      strokeColor: '#FF0000', //red line //808080 grey
      strokeOpacity: 1.0,
      strokeWeight: 2
    }
  );

  coursePath.setMap(map);   //sets the polyline on map

//////////////////////////////////////Note for Dan: ^^^^able to run independently; future refactoring////////////////////////

  var checkArray = [];  //stores all reached checkpoints to draw a polyline to all reached checkpoints
  var checked = 0;  //current index of fixedCoordsArray to compare to user's coords
  var userCoordsArray = []; //stores user's coordinates to draw polyline to all user coords

  var marker = new google.maps.Marker({map: map});  //create new marker object; this marker will move to the user's most recent coords

  repeatUpdatePos();

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

        userCoordsArray.push(pos);  //push coords into array

        marker.setPosition(pos);    //set marker at the coords
//#        map.setCenter(pos);         //center the map to the coords   //currently disabled, because it's annoying when you are far from course

        //draws the path travelled so far by user
        var runningPath = new google.maps.Polyline({
          path: userCoordsArray,
          geodesic: true,
          strokeColor: '#3333CC', //line color: blue
          strokeOpacity: 1.0,
          strokeWeight: 3         //path travelled line is 1 unit thicker than course path
        });

        runningPath.setMap(map);  //set polyline on map

        //checks if a checkpoint is reached
        reachCheckpoint(pos);
      }

        //loops current function every 2 seconds; i.e. every cycle: get user position, store it into array, redraw polyline with new coords
        setTimeout(repeatUpdatePos,2000);

      function errorMessage(error){
        alert("Error: Location info is unavailable.");
      }
    }
    //checks if user has reached checkpoint
    function reachCheckpoint(pos){
      //if user's latitude and longitude matches to 5 decimal places of the checkpoint's, then checkpoint is declared reached
      if( pos.lat.toFixed(5) == fixedCoordsArray[checked].lat.toFixed(5) && pos.lng.toFixed(5) == fixedCoordsArray[checked].lng.toFixed(5) ){

        markersArray[checked].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');  //checkpoint is now green
        checkArray[checked] = fixedCoordsArray[checked]; //store reached checkpoint in this array
        checked = checked + 1;  //next time reachCheckpoint(pos) is called, it will compare current position with the next checkpoint not declared reached

        //draws a new polyline that is green between all reached checkpoints
        var checkPath = new google.maps.Polyline(
          {
            path: checkArray,
            geodesic: true,
            strokeColor: '#006633', //green line
            strokeOpacity: 1.0,
            strokeWeight: 2
          }
        );
        checkPath.setMap(map); //sets polyline of reached checkpoints on map

        //#FLAG THIS CHECKPOINT DATABASE#//
      }
    }
  }

`