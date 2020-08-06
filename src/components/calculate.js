let latitude
let longitude

export let resultToExport = ['']

export default function initMap(calculate, waypointArray) 
{
    let initialPosition = { lat: 59.325, lng: 18.069 };

    var directionsRenderer = new window.google.maps.DirectionsRenderer(),
    directionsService = new window.google.maps.DirectionsService();
    
    var map = new window.google.maps.Map(document.getElementById("map"), {
    center: initialPosition,
    zoom: 15,
    });

    const marker = new window.google.maps.Marker({ map, position: initialPosition });

    // Get user's location
    if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
        // console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`);

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
        calculateAndDisplayRoute(directionsService, directionsRenderer, waypointArray)
    }
}


const calculateAndDisplayRoute = (directionsService, directionsRenderer, waypoints) =>
{
    let waypts = [];

    for (let i = 0; i< waypoints.length; i++) {
    waypts.push({
        location:waypoints[i],
        stopover: true
    })
    }

    directionsService.route(
        {
            origin: new window.google.maps.LatLng(latitude, longitude),
            destination: new window.google.maps.LatLng(latitude, longitude),
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: "DRIVING",
        },
        (res, status) => {
            if (status == "OK") {
                console.log(res)
                directionsRenderer.setDirections(res);
                resultToExport = res.routes[0].legs
            } else {
                window.alert("Directions request failed - " + status);
            }
        }
    );
}