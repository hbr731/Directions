import React, { useState, useEffect } from "react";
import "./App.css";

import initMap from './components/calculate'
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

export default function App() {
  const [waypoints, setWaypoints] = useState();

  useEffect(() => {
    initMap(false) 
  }, [])

  return (
    <div className="App">
      <div id="firstDiv">
        <input
          id="waypoints"
          placeholder="waypoints separated with a comma"
          onChange={(e) => {
            setWaypoints(e.target.value);
          }}
        ></input>
        <button onClick={() => 
          {
            initMap(true, waypoints);
          }} id="submit" value="submit" />
      </div>

      
    </div>
  );
}
