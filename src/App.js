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

const toggleRouteBtn = () => {
  setTimeout(() => {
    if (document.getElementById('0').value.length < 1) document.getElementById('route').disabled = true
    else document.getElementById('route').disabled = false  
  }, 30);
}

export default function App() {
  let waypoints = []
  const [counter, setCounter] = useState(0) // for populating waypoints array in first modal

  const [modal, setModal] = useState(false) // to display or hide modal 1
  const [modal2, setModal2] = useState(false) // to display or hide modal 2
  let count = 1 //for second modal
  const [distance, setDistance] = useState(0) //for second modal
  const [duration, setDuration] = useState({}) //for second modal

  useEffect(() => {
    localStorage.clear()
    initMap(false) 
    setModal(true)
    setTimeout(() => {
      toggleRouteBtn()
    }, 30);
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

  
  return (
    <div className="App">

    <div className='mb-2 mt-2'>
      <Button className='mr-2 btn-success' 
        onClick=
        {() => 
          {
            if(localStorage.getItem('addresses') != null)               // fetching data from localstorage and setting the waypoints array and displaying it in modal 1
            {
              let tempCounter = 0
              waypoints = JSON.parse(localStorage.getItem('addresses'))

              setTimeout(() => {
                document.getElementById('0').value = waypoints[0]
                for(let i = 1; i < waypoints.length; i++)
                {
                  //span to group the textfield and delete button
                  let span = document.createElement('span')
                  span.id = `span${counter + 1}`
                  span.style.display = 'flex'

                  //textfield
                  let textField = document.createElement('input')
                  textField.className = 'form-control mt-2'
                  textField.placeholder = 'Enter address'
                  textField.value = waypoints[i]
                  textField.id = `${tempCounter + 1}`
                  span.appendChild(textField)

                  //delete button
                  let deleteButton = document.createElement('button')
                  deleteButton.onclick = (e) => {
                    e.preventDefault()
                    document.getElementById(`span${counter + 1}`).remove()
                    setCounter(counter - 1)
                    console.log(`counter = ${counter}`)
                  }
                  deleteButton.className = 'btn btn-rounded fa fa-trash btn-danger mt-2 ml-2 mr-2 mb-2'
                  span.appendChild(deleteButton)

                  document.getElementById('form').appendChild(span)
                  tempCounter += 1
                }
                setCounter(tempCounter)
              }, 10);
            }
            toggleRouteBtn()
            setModal(true)
          }
        }>
        Add/Edit Addresses
      </Button>

      <Button className='btn-success' onClick={() => setModal2(true)}>Show Waypoints</Button>
    </div>
    
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

          <Button className='float-right ml-2 mb-2 btn-warning' onClick={() => window.location.reload()}>
              New Route
          </Button>
          
          <Button className='float-right mb-2 btn-success' onClick={() =>
              {
                //span to group the textfield and delete button
                let span = document.createElement('span')
                span.id = `span${counter + 1}`
                span.style.display = 'flex'

                //textfield
                let textField = document.createElement('input')
                textField.className = 'form-control mt-2'
                textField.placeholder = 'Enter address'
                textField.id = `${counter + 1}`
                span.appendChild(textField)

                //delete button
                let deleteButton = document.createElement('button')
                deleteButton.onclick = (e) => {
                  e.preventDefault()
                  document.getElementById(`span${counter + 1}`).remove()
                  setCounter(counter - 1)
                }
                deleteButton.className = 'btn btn-rounded fa fa-trash btn-danger mt-2 ml-2 mr-2 mb-2'
                span.appendChild(deleteButton)

                document.getElementById('form').appendChild(span)
                setCounter(counter => counter + 1)
              }
            }>
              Add Address
            </Button>
          
          <Form.Control id='0' onChange={(e) => 
            {
              waypoints[0] = e.target.value
              toggleRouteBtn()
            }} 
            className='textbox' type='text' placeholder='Enter address'
          />
        
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button className='btn-danger' onClick={() => setModal(false)}>Close</Button>
        
        <Button 
          id ='route'
          onClick={() =>
          {
            for(let i = 0; i <= counter; i++)
            {
              waypoints[i] = document.getElementById(i).value
            }
            localStorage.setItem('addresses', JSON.stringify(waypoints))
            initMap(true, checkAddress(waypoints))
            setModal(false)
            setCounter(0)
          }}>
            Route
        </Button>

      </Modal.Footer>
    </Modal>



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


  //TODO: show entered addresses in textboxes in modal1 when button clicked                                         DONE
  //TODO: disable calculate button if user hasn't entered an address                                                DONE
  //TODO: if user has an extra address field and clicks submit, remove the field and then send request to the API