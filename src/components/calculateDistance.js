(function (exports){
    function initMap() {
    const google = window.google;
      var directionsRenderer = new google.maps.DirectionsRenderer(),
        directionsService = new google.maps.DirectionsService();
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:40.730610, lng : -73.935242},
        zoom: 17
      })
      directionsRenderer.setMap(map);

}
function calculateAndDisplayRoute() {
    const google = window.google;
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
    
      // directionsDisplay.setMap(map);
      let directionsService = new google.maps.DirectionsService(),
        request = {
          origin: origin,
          destination: origin,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: "DRIVING",
        };
    
      directionsService.route(request, (result, status) => {
        if (status == "OK") {
          console.log(result);
          //   directionsRenderer.setDirections(result);
          //   var route = result.routes[0];
          //   var summaryPanel = document.getElementById("directionspanel");
          //   summaryPanel.innerHTML = "";
          //   // For each route, display summary information.
          //   for (var i = 0; i < route.legs.length; i++) {
          //     var routeSegment = i + 1;
          //     summaryPanel.innerHTML +=
          //       "<b>Route Segment: " + routeSegment + "</b><br>";
          //     summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          //     summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          //     summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
          //   }
        } else {
          window.alert("Directions request failed due to " + status);
        }
      });
    }
    exports.calculateAndDisplayRoute = calculateAndDisplayRoute;
    exports.initMap = initMap;
})((this.window = this.window || {}));
