
import React, {useState} from 'react';
import './App.css';
import calculateDistance from './components/calculateDistance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Number, Button } from 'react-bootstrap'


function App() {
  const [origin, setOrigin] = useState('')
  const [dest, setDest] = useState([])
  const [fields, setFields] = useState(0)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="App">
      <div id='firstDiv'>
        <input id='initialTextField' onChange={e => {setFields(e.target.value)}}></input>
        <button id='initialButton' onClick={() => handleShow()}>submit</button>
      </div>

      <div id='secondDiv' >

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(() => {
              let ret;
              
              
              for(let i = 0; i < fields; i++) {
                let input = document.createElement("input");
                input.type = "text";
                input.name = "field"+i;
                ret += input;
              }
              return ret
            })()}
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
              Save Changes
          </Button>
          </Modal.Footer> 
        </Modal>  
      </div>

    </div>
  );
}

export default App;
