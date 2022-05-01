/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Sunhee Kim
  -Purpose of this Page: 
    The entity pickup location is tied to a users orders through the bridge 
    entity called pickups. A pickup location can be created by an admin to provide
    more spots for customer order pickups. This script will allow a customer to 
    view all instances of a pickup locations for the user to select as pickup 
    options at checkout of an order.
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Nav from './nav';

/*Function ReadPickupLocation - will reference the api for a getpickuplocations 
through sql commands through the getData function to retrieve all the values in
 the entity pickups */
function ReadPickupLocation() {
  let history = useHistory();
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  /*sets local stoarage variables (accessed later) to a set of passed in arguments 
  - all the pickup location entity attributes used for later display*/
  const setData = (data) => {
    let { pickup_location_id, pickup_location_parking_spot } = data;
    localStorage.setItem('pickup_location_id', pickup_location_id);
    localStorage.setItem('pickup_location_parking_spot', pickup_location_parking_spot);
   
  }
  /*Function getData - will reference the api for a getpickuplocations through sql 
  commands. The pickup location ID and pickup location parking spot for all 
  existing values in the entity pickuplocation will be displayed as outputs for 
  the user to view*/
  const getData = () => {
    axios.get('/api/get/getpickuplocations')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }
 
/*Function onDelete - will reference the api for a deletepickuplocation through sql 
commands and interface with the user. The pickup location ID (primary key) will be taken 
from user input and then deleted*/
  const onDelete = (pickup_location_id) => {
    axios.put('/api/delete/deletepickuplocation', {
        pickup_location_id
    }).then(() => {
      getData();
    })
  }
 /*returns the js code for displaying the inputs and processing the data to view all
    established pickup location entity instances. Also has buttons linked to updating 
    and deleting a specified pickup location instance*/
  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
      <Button onClick={() => history.push('/createpickuplocation')}>Create Pickup Location</Button>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Pickup Location ID</Table.HeaderCell>
            <Table.HeaderCell>Parking Spot</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.pickup_location_id}</Table.Cell>
                <Table.Cell>{data.pickup_location_parking_spot}</Table.Cell>
                <Link to='/updatepickuplocation'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.pickup_location_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
    :
    <div>
      <Nav></Nav>
      <h2>You are not an admin!</h2>
    </div>
  )
}

export default ReadPickupLocation;
