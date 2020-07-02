import React, {useState} from 'react';
import axios from 'axios'
import './App.css';

const getDirections = async (origin, dest) => {
  const originToSend = origin.replace(/ /g, '+')
  const destToSend = dest.replace(/ /g, '+')

  // fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${originToSend}+Staten+Island+NY&destination=${destToSend}+Staten+Island+NY&key=AIzaSyDwHLEMiluyIpzJI9VmRRbI8L4C_5w6VTA`, {
  //   method:'GET',
  //    headers: {
  //      //'Content-Type': 'application/json',
  //      'Access-Control-Allow-Origin': '*',
  //      'Access-Control-Allow-Credentials': 'true'
  //    },
  //   mode: 'cors',
  //    credentials: 'include',
  // }).then(res => console.log(res.json())).catch(e => console.log(e))

  //await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${originToSend}+Staten+Island+NY&destination=${destToSend}+Staten+Island+NY&key=AIzaSyDwHLEMiluyIpzJI9VmRRbI8L4C_5w6VTA`.then(res => console.log(res)).catch(e => console.log(e))

  axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/directions/json?origin=${originToSend}+Staten+Island+NY&destination=${destToSend}+Staten+Island+NY&key=AIzaSyDwHLEMiluyIpzJI9VmRRbI8L4C_5w6VTA`,
    headers: {
      'Access-Control-Allow-Origin': 'localhost:3000',
    },
    mode:'cors',
    
  }).then(res => console.log(res.json())).catch(e => console.log(e))
  
  // console.log(res);

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

      <button onClick={() => getDirections(origin, dest)}>Display</button>
    </div>
  );
}

export default App;
