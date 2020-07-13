// const google = window.google;

// export default function calculateAndDisplayRoute() {
//   let waypts = [];

//   let fields = localStorage.getItem("fields");
//   for (let i = 0; i < fields; i++) {
//     let name = "field" + i;
//     console.log(name);
//     let currentField = document.getElementsByName(name)[0];
//     console.log(currentField);
//     waypts.push({
//       location: currentField.value,
//       stopover: true,
//     });
//   }

//   console.log(waypts);
  
//   // directionsDisplay.setMap(map);
// //   var directionsRenderer = new google.maps.DirectionsRenderer();

//   let directionsService = new google.maps.DirectionsService(),
//   request = {
//     origin: origin,
//     destination: origin,
//     waypoints: waypts,
//     optimizeWaypoints: true,
//     travelMode: "DRIVING",
//   };

//   directionsService.route(request, (result, status) => {
//     if (status == "OK") {
//       console.log(result);
//     //   directionsRenderer.setDirections(result);
//     //   var route = result.routes[0];
//     //   var summaryPanel = document.getElementById("directionspanel");
//     //   summaryPanel.innerHTML = "";
//     //   // For each route, display summary information.
//     //   for (var i = 0; i < route.legs.length; i++) {
//     //     var routeSegment = i + 1;
//     //     summaryPanel.innerHTML +=
//     //       "<b>Route Segment: " + routeSegment + "</b><br>";
//     //     summaryPanel.innerHTML += route.legs[i].start_address + " to ";
//     //     summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
//     //     summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
//     //   }
//     } else {
//       window.alert("Directions request failed due to " + status);
//     }
//   });
// }

// export default function calculateAndDisplayRoute() {
//   let directionsService = localStorage.getItem("directionsService"),
//     directionsRenderer = localStorage.getItem("directionsRenderer");

//   let waypts = [];

//   let fields = localStorage.getItem("fields");
//   for (let i = 0; i < fields; i++) {
//     let name = "field" + i;
//     console.log(name);
//     let currentField = document.getElementsByName(name)[0];
//     console.log(currentField);
//     waypts.push({
//       location: currentField.value,
//       stopover: true,
//     });
//   }

//   console.log(waypts);
//   let request = {
//     origin: origin,
//     destination: origin,
//     waypoints: waypts,
//     optimizeWaypoints: true,
//     travelMode: "DRIVING",
//   };

//   directionsService.route(request, (result, status) => {
//     if (status === "OK") {
//       console.log(result);
//       directionsRenderer.setDirections(result);
//       var route = result.routes[0];
//       var summaryPanel = document.getElementById("directionspanel");
//       summaryPanel.innerHTML = "";
//       // For each route, display summary information.
//       for (var i = 0; i < route.legs.length; i++) {
//         var routeSegment = i + 1;
//         summaryPanel.innerHTML +=
//           "<b>Route Segment: " + routeSegment + "</b><br>";
//         summaryPanel.innerHTML += route.legs[i].start_address + " to ";
//         summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
//         summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
//       }
//     } else {
//       window.alert("Directions request failed due to " + status);
//     }
//   });
// }
