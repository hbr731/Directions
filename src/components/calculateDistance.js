const google = window.google;

export default function calculateDistance (origin, destination, waypoints) {
  // let array = waypts.split(',');
  // let waypoints=[]
  // for (let i = 0; i < array.length;i++) {
  //     waypoints.push({location: array[i], stopover:true})
  // }
  console.log(waypoints)
let directionService = new google.maps.DirectionsService(),
  request = {
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    optimizeWaypoints: true,
    travelMode: "DRIVING",
  };
directionService.route(request, (result, status) => {
  if (status == "OK") {
    console.log(result);
  } else {
    window.alert("Directions request failed due to " + status);
  }
});
};