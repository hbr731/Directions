import React, { useState, useEffect } from "react";
import "./App.css";

import initMap from './components/calculate'
import { resultToExport } from './components/calculate'
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

const checkAddress = (waypts) => { // Checking the user input of the address
  let ret = waypts
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
  let waypoints = []
  let counter = 0 // for populating waypoints array in first modal

  const [modal, setModal] = useState(false) // to display or hide modal 1
  const [modal2, setModal2] = useState(false) // to display or hide modal 2
  let count = 1 //for second modal
  const [distance, setDistance] = useState(0) //for second modal
  const [duration, setDuration] = useState(0) //for second modal

  useEffect(() => {
    initMap(false) 
    setModal(true)
  }, [])

  useEffect(() => {                                         // for calculating distance and duration of the trip
    if(modal2 == true && resultToExport != undefined)
    {
      let dist = 0
      resultToExport.map((data) => {
        if(data.distance.text.includes(','))
        {
          let regex = /\d+((.|,)\d+)?/
          let result = data.distance.text.match(regex)
          dist += parseInt(result[0].split(',')[0] + result[0].split(',')[1])
          // setDuration(duration + parseFloat(data.duration.text))
        }

        else
        {
          dist += parseFloat(data.distance.text)
        }
      })
      
      setDistance(dist)

    }
  }, [resultToExport])

  // useEffect(() => {
  //   if(waypoints == undefined || waypoints == '')            // to disable or enable the calculate button to prevent user from pressing it without entering any input
  //   {
  //     document.getElementById('submit').disabled = true
  //   }

  //   else{
  //     document.getElementById('submit').disabled = false
  //   }
  // },[waypoints])

  return (
    <div className="App">
    
    {/* FIRST MODAL */}
    <Modal show={modal}>
      <Modal.Header>
        <Modal.Title id="contained-modal-title">
          Waypoints
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='form'>
          <Form.Label className='label'>Enter addresses</Form.Label>
          
          <Button className='float-right mb-2 btn-success' onClick={() =>
              {
                let textField = document.createElement('input')
                textField.className = 'form-control mt-2'
                textField.placeholder = 'Enter address'
                textField.id = `${counter + 1}`
                document.getElementById('form').appendChild(textField)
                counter += 1
                // value = document.getElementById(`${counter + 1}`) == undefined ? '' : waypoints[counter + 1]
              }
            }>
              Add
            </Button>
          <Form.Control onChange={(e) => waypoints[0] = e.target.value} className='textbox' type='text' placeholder='Enter address'/>
        
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() =>
          {
            for(let i = 1; i <= counter; i++)
            {
              waypoints[i] = document.getElementById(i).value
            }

            initMap(true, checkAddress(waypoints))
            setModal(false)
          }}>Route</Button>
        <Button className='btn-danger' onClick={() => setModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>



    <div className='mb-2 mt-2'>
      <Button className='mr-2 btn-success' onClick={() => setModal(true)}>Add/Edit Addresses</Button>
      <Button className='btn-success' onClick={() => setModal2(true)}>Show Waypoints</Button>
    </div>



    {/* SECOND MODAL */}
    <Modal show={modal2}>
      <Modal.Header>
        <Modal.Title id="contained-modal-title">
          Waypoints
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          modal2 === true ? 
            resultToExport.map((data) => 
              <p>{count++}: {data.end_address}</p>
            )
            :
            ''
        }

        <h3>Distance:</h3><p>{distance.toFixed(1)} miles</p>
        <h3>Duration:</h3><p>{duration} minutes</p>

      </Modal.Body>

      <Modal.Footer>
        <Button className='btn-danger' onClick={() => setModal2(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
     
    </div>
  );
}



  // - create two buttons for modals
  //   - one for editing or adding address
  //     - show entered addresses in textboxes when button is clicked
  //   - one for viewing the result


  //TODO: calculate duration of the trip
  //TODO: show entered addresses in textboxes in modal1 when button clicked