import React, { useState, useEffect } from "react";
import "./App.css";

import calculateAndDisplayRoute from "./components/calculateDistance";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

export default function App() {
  const [origin, setOrigin] = useState("");
  const [fields, setFields] = useState(0);
  const [show, setShow] = useState(false);
  const [waypoints, setWaypoints] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      let textFields = document.getElementById("textFields");
      for (let i = 0; i < fields; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.name = "field" + i;
        input.placeholder = `address ${i + 1}`;
        textFields.appendChild(input);
        textFields.appendChild(document.createElement("br"));
        textFields.appendChild(document.createElement("br"));
      }
    }
  }, [show]);

  return (
    <div className="App">
      <div id="firstDiv">
        <input
          id="origin"
          onChange={(e) => setOrigin(e.target.value)}
          placeholder={"Origin"}
        ></input>
        {/* <input
          id="initialTextField"
          onChange={(e) => {
            setFields(e.target.value);
          }}
        ></input> */}
        <input
          id="waypoints"
          placeholder="waypoints separated with a comma"
          onChange={(e) => {
            setWaypoints(e.target.value);
          }}
        ></input>
        {/* <input type="submit" id="submit" value="submit" /> */}
      </div>

      
    </div>
  );
}
