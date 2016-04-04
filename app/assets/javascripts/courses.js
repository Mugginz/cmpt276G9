// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//

var deleteMode = 1;

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
	var lines = []; //stores polylines
	var j = 0; // length of markerArr
	var runningPath; //polyline of markers

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

	if( navigator.geolocation ){
		navigator.geolocation.getCurrentPosition(showPosition, errorMessage);
	}
	else{
		alert("Error: This browser does not support geolocation.");
	}

	var infoWindowStart, infoWindowEnd;

	//adding markers onto map
	google.maps.event.addListener(map, "click", function (event) {
		if(deleteMode == 1){
    	var latitude = event.latLng.lat();
			var longitude = event.latLng.lng();

			pos = {
	      lat: latitude,
	      lng: longitude
	    };

	    coords.push(pos);
/////////
//myLatLng = new google.maps.LatLng({lat: -34, lng: 151});
//alert(myLatLng.lat());
/*			var a = [];
			a.push([1,2]);
			a.push([2,4]);
			var b = [];
			b.push({hi: 1, bye: 2});
			b.push({hi: 3, kill: 4});
			alert(a);
			alert(b);
*/
////


			var marker = new google.maps.Marker(
				{ map: map,
					unique_id: j,    //able to identify a specific marker to do stuff to
					position: pos,
					draggable: true
				}
			);
			j++;

			markersArr.push(marker);
			marker.setPosition(markersArr[markersArr.length - 1].position);
	//    marker.setPosition(pos);


			updatePath();

				//deletes clicked markers if deleteMode is on
			google.maps.event.addListener(marker, 'click', function(){
//					alert("delete listener "+marker.unique_id);
/*					if(deleteMode = 0){
						alert("delete mode on");
						marker.setMap(null);
					}
*/
					deleteMarkers(marker.unique_id);

				});

				//redraw polyline after a marker is dragged in place
				google.maps.event.addListener(marker, 'dragend', function() {

					var	position = this.getPosition(); //get LatLng of marker
					var index = markersArr.indexOf(this); //get the index of this marker

///////
/*					alert("getPosition: " +position);
					position = {lat: position.lat(), lng: position.lng()};
					alert("position: " +position);
					*/
//////
					position = {lat: markersArr[index].position.lat(), lng: markersArr[index].position.lng()}; //LatLng object to LatLng literal
					coords[index] = position;	//update new coordinate in array

					updatePath();
				});
		}
	});

	function updatePath(){

		runningPath = new google.maps.Polyline({
		  path: coords,
		  geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2,
		});

		if (lines.length > 0){
			lines[lines.length - 1].setMap(null); //removes previous polyline from map
		}

		lines.push(runningPath);
		lines[lines.length -1].setMap(map); //sets the new polyline on map
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
//				markersArr[i].unique_id = i;	//reassign the marker id's to match its index
//alert("positionmarker: "+ markersArr[i].position.lat());
				latLngLiteral = {lat: markersArr[i].position.lat(), lng: markersArr[i].position.lng()};
//alert("latlnglit: "+latLngLiteral);
				coords.push(latLngLiteral);	//
			}
			updatePath();
//			alert("markersArr length:"+ markersArr.length+"coords length: "+coords.length);//
//			alert("coords: "+ coords+"  markersArr: "+ markersArr[0].position+ ", "+markersArr[markersArr.length-1].position);
		}
	}


/* //too implement later if time permits
	function windowsDisplay(){
		//show infowindow to show where the start marker is
		if (infoWindowStart == null && markersArr.length > 0){
					infoWindowStart = new google.maps.InfoWindow({map: map});
					infoWindowStart.setContent("Start");
					infoWindowStart.open(map, markersArr[0]); //infowindow to indicate first marker placed
		}
		//show infowindow to show where the last marker is
		if (markersArr.length > 1){
			if(infoWindowEnd == null){
				infoWindowEnd = new google.maps.InfoWindow({map: map});
				infoWindowEnd.setContent("End");
				infoWindowEnd.open(map, markersArr[markersArr.length - 1]); //infowindow to indicate last marker placed
	//					infoWindowEnd.setPosition(coords.length - 1);
				}
	//						infoWindowEnd.close();
					infoWindowEnd.setPosition(coords.length -1);
		}
	}
	*/
///////////////////

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
