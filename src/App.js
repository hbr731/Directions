import React, { useState, useEffect } from "react";
import "./App.css";
import calculateDistance from "./components/calculateDistance";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Number, Button } from "react-bootstrap";

function App() {
  const [origin, setOrigin] = useState("");
  const [fields, setFields] = useState(0);
  const [show, setShow] = useState(false);
  const [waypoints, setWaypoints] = useState({list:[]});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      let textFields = document.getElementById("textFields");
      // console.log(textFields);
      for (let i = 0; i < fields; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.name = `field${i}`;
        input.placeholder = `address ${i + 1}`
        // input.onChange = (e) => {setWaypoints([...waypoints, e.target.value])}               
        textFields.appendChild(input);
        textFields.appendChild(document.createElement("br"));
        textFields.appendChild(document.createElement("br"));
        //   console.log(input)
        // }
        // console.log(i + " " + input);
      }
    }
  }, [show]);

  let getWaypoints = () => {
    waypoints.list = []
    for(let i = 0; i < fields; i++) {
      let name = "field"+i;
      console.log(name);
      let currentField = document.getElementsByName(name)[0];
      console.log(currentField)
      waypoints.list.push({
        location:currentField.value,
        stopover: true})
    }
  }

  return (
    <div className="App">
      <div id="firstDiv">
        <input
          onChange={(e) => setOrigin(e.target.value)}
          placeholder={"Origin"}
        ></input>
        <input
          id="initialTextField"
          onChange={(e) => {
            setFields(e.target.value);
          }}
        ></input>
        <button id="initialButton" onClick={() => handleShow()}>
          submit
        </button>
      </div>

      <div id="secondDiv">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="textFields"></div>                        
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                getWaypoints();
                calculateDistance(origin, origin, waypoints.list)}
              }
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
