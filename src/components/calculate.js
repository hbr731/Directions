let latitude
let longitude


export default function initMap(calculate, waypointString) 
{
    let initialPosition = { lat: 59.325, lng: 18.069 };

    var directionsRenderer = new google.maps.DirectionsRenderer(),
    directionsService = new google.maps.DirectionsService();
    
    var map = new google.maps.Map(document.getElementById("map"), {
    center: initialPosition,
    zoom: 15,
    });

    const marker = new google.maps.Marker({ map, position: initialPosition });

    // Get user's location
    if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
        console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`);

        latitude = position.coords.latitude
        longitude = position.coords.longitude

        // Set marker's position.
        marker.setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });

        // Center map to user's position.
        map.panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        },
        err => console.log(err)
    );
    } else {
    alert('Geolocation is not supported by your browser.');
    }

    directionsRenderer.setMap(map);

    if(calculate)
    {
        calculateAndDisplayRoute(directionsService, directionsRenderer, waypointString);   
    }
}


const calculateAndDisplayRoute = (directionsService, directionsRenderer, waypointString) =>
{
    let waypts = [];
    let waypoints = waypointString.split(',');

    for (let i = 0; i< waypoints.length; i++) {
    waypts.push({
        location:waypoints[i],
        stopover: true
    })
    }

    directionsService.route(
    {
        origin: new google.maps.LatLng(latitude, longitude),
        destination: new google.maps.LatLng(latitude, longitude),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: "DRIVING",
    },
    (result, status) => {
        if (status == "OK") {
        console.log(result);
        directionsRenderer.setDirections(result);
        var route = result.routes[0];
        var summaryPanel = document.getElementById("directionspanel");
        summaryPanel.innerHTML = "";
        for (var i = 0; i < route.legs.length; i++) {
            var routeSegment = i + 1;
            summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML +=
            route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML +=
            route.legs[i].distance.text + "<br><br>";
        }
        } else {
        window.alert("Directions request failed due to " + status);
        }
    }
    );
}