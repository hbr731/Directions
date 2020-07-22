import React, { useState, useEffect } from "react";
import "./App.css";

import initMap from './components/calculate'
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Navbar, FormControl, Form } from "react-bootstrap";

export default function App() {
  const [waypoints, setWaypoints] = useState();

  useEffect(() => {
    initMap(false) 
  }, [])

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
              initMap(true, waypoints);
            }} type= 'submit' id="submit" value="submit">Calculate</Button>
        {/* </Form> */}
      </Navbar>
      
    </div>
  );
}
