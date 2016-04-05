// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//

var deleteMode = 1;	//when deleteMode = 0: able to add markers; 1: able to delete markers

function deleteMarkerMode(){
	if (deleteMode == 0){
		deleteMode = 1;
		document.getElementById("toggleDelete").innerHTML = "Delete Markers";
		document.getElementById("toggleNote").innerHTML = "Click on map to add markers.";
	}
	else{
		deleteMode = 0;
		document.getElementById("toggleDelete").innerHTML = "Add Markers";
		document.getElementById("toggleNote").innerHTML = "Click on markers to delete them.";
	}
}

function createInit(){

	var coords = [];
	var markersArr = [];
	var lines = []; 	//stores polylines
	var j = 0; 				//id for markers in array
	var runningPath; 	//polyline of markers on map

	$("#cc").click(function(){
		var arr = [];
		var point = [];
		var pack = "[";

		var n = coords.length;
		for(var i = 0; i < (n-1); i++){
			arr[i] = [coords[i]["lat"], coords[i]["lng"]];
			pack = pack + "[" + arr[i] + "], ";
		};
			pack = pack + "[" + coords[n-1]["lat"] +","+coords[n-1]["lng"] + "]";
			pack = pack + "]";
		var n = $("#cn").val();
		var r = $("#cr").val();

		$.ajax({
			type: "POST",
			url: "/create",
			data: {name: n, region: r, coords: pack}
		});
	});

  //setting up initial map of Vancouver
	var map = new google.maps.Map(document.getElementById('mapcreate'), {
		center: {lat: 49.27750, lng: -122.91450},
		zoom: 17
	});

	//get user's position to center map at their location
	if( navigator.geolocation ){
		navigator.geolocation.getCurrentPosition(showPosition, errorMessage);
	}
	else{
		alert("Error: This browser does not support geolocation.");
	}

	var infoWindowStart, infoWindowEnd;

	//adding markers onto map when map is clicked
	google.maps.event.addListener(map, "click", function (event) {
		if(deleteMode == 1){
    	var latitude = event.latLng.lat();
			var longitude = event.latLng.lng();

			pos = {
	      lat: latitude,
	      lng: longitude
	    };

	    coords.push(pos);

			var marker = new google.maps.Marker(
				{ map: map,
					unique_id: j,
					position: pos,
					draggable: true
				}
			);
			j++;

			markersArr.push(marker);
			marker.setPosition(markersArr[markersArr.length - 1].position);

			updatePath();

			//deletes clicked markers if deleteMode is on
			google.maps.event.addListener(marker, 'click', function(){
					deleteMarkers(marker.unique_id);
			});

				//redraw polyline after a marker is dragged in place
			google.maps.event.addListener(marker, 'dragend', function() {

				var	position = this.getPosition();
				var index = markersArr.indexOf(this);

				//LatLng object to LatLng literal
				position = {lat: markersArr[index].position.lat(), lng: markersArr[index].position.lng()};
				coords[index] = position;

				updatePath();
			});
		}
	});

	//display an updated polyline for markers on map
	function updatePath(){

		runningPath = new google.maps.Polyline({
		  path: coords,
		  geodesic: true,
			strokeColor: '#FF0000', //red
			strokeOpacity: 1.0,
			strokeWeight: 3,
		});

		//remove previous polyline from map
		if (lines.length > 0){
			lines[lines.length - 1].setMap(null);
		}

		lines.push(runningPath);

		//sets the new polyline on map
		lines[lines.length -1].setMap(map);
	}

	function deleteMarkers(markerId){
		if (deleteMode == 0){
			for (var i = 0; i < markersArr.length; i++){
				if (markerId == markersArr[i].unique_id){
					markersArr[i].setMap(null);
					markersArr.splice(i, 1); //removes marker at index markerId and shifts rest of elements
					break;
				}
			}

			coords = [];

			for(var i = 0; i < markersArr.length; i++){
				latLngLiteral = {lat: markersArr[i].position.lat(), lng: markersArr[i].position.lng()};
				coords.push(latLngLiteral);
			}
			updatePath();
		}
	}

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
