const google = window.google;

// export default function calculateDistance (origin, destination, waypoints) {
//   // let array = waypts.split(',');
//   // let waypoints=[]
//   // for (let i = 0; i < array.length;i++) {
//   //     waypoints.push({location: array[i], stopover:true})
//   // }
//   console.log(waypoints)
// let directionService = new google.maps.DirectionsService(),
//   request = {
//     origin: origin,
//     destination: destination,
//     waypoints: waypoints,
//     optimizeWaypoints: true,
//     travelMode: "DRIVING",
//   };
// directionService.route(request, (result, status) => {
//   if (status == "OK") {
//     console.log(result);
//   } else {
//     window.alert("Directions request failed due to " + status);
//   }
// });
// };

function initMap() {
  let directionsService = new google.maps.DirectionsService(),
    directionsRenderer = new google.maps.DirectionsRenderer();
  let NYC = new google.maps.LatLng(40.73061, -73.935242);
  var mapOptions = {
    zoom: 7,
    center: NYC,
  };

  let map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map);

  document.getElementById("submit").addEventListener("click", function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });

  // directionsRenderer.setPanel(document.getElementById("directionsPanel"));
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  let waypts = [];

  let fields = localStorage.getItem("fields");
  for (let i = 0; i < fields; i++) {
    let name = "field" + i;
    console.log(name);
    let currentField = document.getElementsByName(name)[0];
    console.log(currentField);
    waypts.push({
      location: currentField.value,
      stopover: true,
    });
  }

  console.log(waypts);
  let request = {
    origin: origin,
    destination: origin,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: "DRIVING",
  };
  // directionsDisplay.setMap(map);

  directionsService.route(request, (result, status) => {
    if (status == "OK") {
      console.log(result);
      directionsRenderer.setDirections(result);
      var route = result.routes[0];
      var summaryPanel = document.getElementById("directionspanel");
      summaryPanel.innerHTML = "";
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML +=
          "<b>Route Segment: " + routeSegment + "</b><br>";
        summaryPanel.innerHTML += route.legs[i].start_address + " to ";
        summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
        summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
      }
    } else {
      window.alert("Directions request failed due to " + status);
    }
  });
}
