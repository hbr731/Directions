
import React, {useState} from 'react';
import axios from 'axios'
import './App.css';

const google = window.google;

const calculateDirections = (origin, destination) => {
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

function App() {
  const [origin, setOrigin] = useState('')
  const [dest, setDest] = useState('')
  
  return (
    <div className="App">
      <input 
        onChange={e => setOrigin(e.target.value)} 
        placeholder={'Origin'}>
      </input>

      <input 
        onChange={e => setDest(e.target.value)} 
        placeholder={'Destination'}>
      </input>

      <button onClick={() => calculateDirections(origin, dest)}>Display</button>
    </div>
  );
}

export default App;
