// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//

function createInit(){

	var coords = [];

	$("#cc").click(function(){
		var arr = [];
		var point = [];
		for(var i = 0; i < coords.length; i++){
			point[0] = coords[i]["lat"];
			point[1] = coords[i]["lng"];
			arr[i] = point;
		};
		var pack = JSON.stringify(arr);
		var n = $("#cn").val();
		var r = $("#cr").val();

		//for debugging only.
		alert("data package: " + n +", " + r + ", " + pack);

		$.ajax({
			type: "POST",
			url: "/create",
			data: {name: n, region: r, coords: pack},
			success: function(){
				alert("posted");
			},
			error: function(){
				alert("fail");
			}
		}); 
	});

  //setting up initial map of Vancouver
	var map = new google.maps.Map(document.getElementById('mapcreate'), {
		center: {lat: 49.27750, lng: -122.91450},
		zoom: 17
	});

	var marker = new google.maps.Marker({map: map});

	if( navigator.geolocation ){
		navigator.geolocation.getCurrentPosition(showPosition, errorMessage);
	}
	else{
		alert("Error: This browser does not support geolocation.");
	}

	google.maps.event.addListener(map, "click", function (event) {
    	var latitude = event.latLng.lat();
		var longitude = event.latLng.lng();

    	var marker = new google.maps.Marker({map: map});

	    pos = {
	      lat: latitude,
	      lng: longitude
	    };
	    coords.push(pos);

	    marker.setPosition(pos);

	    var runningPath = new google.maps.Polyline({
    		path: coordsArray,
    		geodesic: true,
    		strokeColor: '#FF0000',
    		strokeOpacity: 1.0,
    		strokeWeight: 2
    	});
		runningPath.setMap(map);
	});

	function showPosition(position){
    	pos = {
    		lat: position.coords.latitude,
    		lng: position.coords.longitude
   		};
    	map.setCenter(pos);
	};
}

function errorMessage(error){
	alert("Error: Location info is unavailable.");
};