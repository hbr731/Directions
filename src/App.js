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
  const [duration, setDuration] = useState({}) //for second modal

  useEffect(() => {
    initMap(false) 
    setModal(true)
  }, [])

  useEffect(() => {                                         // for calculating distance and duration of the trip
    if(modal2 == true && resultToExport != undefined)
    {
      let totalDistance = 0
      let totalDuration = 0

      resultToExport.map((data) => { 

        // calculating distance
        if(data.distance.text.includes(','))
        {
          let regex = /\d+((.|,)\d+)?/
          let result = data.distance.text.match(regex)
          totalDistance += parseInt(result[0].split(',')[0] + result[0].split(',')[1])
        }

        else
        {
          totalDistance += parseFloat(data.distance.text)
        }

        // calculating duration
        let dur = data.duration.text.split(' ')
        
        for(let i = 0; i < dur.length; i++) {
          if(dur[i] === 'day' || dur[i] === 'days') totalDuration += (1440 * parseInt(dur[i - 1]))

          else if(dur[i] === 'hours' || dur[i] === 'hour') totalDuration += (60 * parseInt(dur[i - 1]))

          else if(dur[i] === 'min' || dur[i] === 'mins') totalDuration += (parseInt(dur[i - 1]))
        }

      })

      setDistance(totalDistance)
      setDuration({
        days: parseInt(totalDuration / (60 * 24)),
        hours: parseInt((totalDuration % (24*60)) / 60),
        mins: parseInt((totalDuration % (24 * 60)) % 60)
      })

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
      <Button className='btn-danger' onClick={() => setModal(false)}>Close</Button>
        <Button onClick={() =>
          {
            for(let i = 1; i <= counter; i++)
            {
              waypoints[i] = document.getElementById(i).value
            }

            initMap(true, checkAddress(waypoints))
            setModal(false)
          }}>Route</Button>
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
        <div className='flex'>
          <div className='float-right w-50'>
          {
              resultToExport.map((data) => 
                data === '' ? 
                  <h2 className='text-center'>No Directions</h2>
                  :
                  <p className='text-left'>{count++}: {data.end_address}</p>
              )
          }
          </div>
          <div className='float-left w-50'> 
            <h3 className='text-left'>Distance:</h3><p>{distance.toFixed(1)} miles</p>
            <h3 className='text-left'>Duration:</h3>
              {duration.days != 0 ? <p>{duration.days} days</p> : ''}
              {duration.hours != 0 ? <p>{duration.hours} hours</p> : ''}
              <p>{duration.mins} mins</p>
          </div>
        </div>

      </Modal.Body>

      <Modal.Footer>
        <Button className='btn-danger' onClick={() => setModal2(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
     
    </div>
  );
}


  //TODO: show entered addresses in textboxes in modal1 when button clicked
  //TODO: disable calculate button if user hasn't entered an address
  //TODO: if user has an extra address field and clicks submit, remove the field and then send request to the API