const google = window.google;

export default function calculateDistance(origin, destination) {
  let directionService = new google.maps.DirectionsService(),
    request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    }

  directionService.route(request, (result, status) => {
    if (status == 'OK') {
      console.log(result);
    }
  })
}