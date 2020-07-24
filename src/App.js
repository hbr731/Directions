import React, { useState, useEffect } from "react";
import "./App.css";

import initMap from './components/calculate'
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Navbar, FormControl, Form } from "react-bootstrap";

const checkAddress = (waypts) => {
  let ret = waypts.split(',')
  const streetNames = ['ave', 'avenue', 'place', 'pl', 'st', 'street', 'blvd', 'boulevard', 'road', 'rd', 'court', 'ct', 'drive', 'dr']

  for(let i = 0; i < ret.length; i++)
  {
    let temp = ret[i].split(' ')
    if(streetNames.indexOf(temp[temp.length - 1]) !== -1)
    {
      ret[i] = ret[i] + ' staten island NY'
    }
  }
  return ret
}

export default function App() {
  const [waypoints, setWaypoints] = useState();

  useEffect(() => {
    initMap(false) 
  }, [])

  useEffect(() => {
    if(waypoints == undefined || waypoints == '')
    {
      document.getElementById('submit').disabled = true
    }

    else{
      document.getElementById('submit').disabled = false
    }
  },[waypoints])

  return (
    <div className="App">
      
      <Navbar bg='dark'>
      {/* <Form inline> */}
          <FormControl
            id="waypoints"
            className='mr-sm-2'
            placeholder="Addresses separated with a comma"
            onChange={(e) => {
              setWaypoints(e.target.value);
            }}
          ></FormControl>
          <Button onClick={() => 
            {
              initMap(true, checkAddress(waypoints));
            }} id="submit" value="submit">Calculate</Button>
        {/* </Form> */}
      </Navbar>
     
    </div>
  );
}
