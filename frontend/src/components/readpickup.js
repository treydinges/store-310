/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Sunhee Kim
  -Purpose of this Page: 
    The entity pickup location is tied to a users orders through the bridge 
    entity called pickups. This script will allow the user to view the entries 
    of the entity pickup. This was mainly used for 
    testing purposes to ensure the pickups entity of the database was setup 
    correctly and functional in all commands.
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Nav from './nav';

/*Function ReadPickup - will reference the api for a getpickup through sql 
commands through the getData function to retrieve all the values in the entity pickups */
function ReadPickup() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  /*sets local stoarage variables (accessed later) to a set of passed in arguments - all the pickup entity 
  attributes used for later display*/
  const setData = (data) => {
    let { pickup_id, order_id, pickup_location_id, pickup_start_time, pickup_end_time, pickup_fk1, pickup_fk2 } = data;
    localStorage.setItem('pickup_id', pickup_id);
    localStorage.setItem('order_id', order_id);
    localStorage.setItem('pickup_location_id', pickup_location_id);
    localStorage.setItem('pickup_start_time', pickup_start_time);
    localStorage.setItem('pickup_end_time', pickup_end_time);
    localStorage.setItem('pickup_fk1', pickup_fk1);
    localStorage.setItem('pickup_fk2', pickup_fk2);
  }

  /*Function getData - will reference the api for a getpickup through sql 
  commands. The pickup ID, order ID, pickup location ID, start time for 
  pickup, and end time for all existing values in the entity pickup will 
  be displayed as outputs for the user to view */
  const getData = () => {
    axios.get('/api/get/getpickups')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }
  /*Function onDelete - will reference the api for a deletepickups through sql 
commands and interface with the user. The pickup ID (primary key) will be taken 
from user input and then deleted*/
  const onDelete = (pickup_id) => {
    axios.put('/api/delete/deletepickups', {
      pickup_id
    }).then(() => {
      getData();
    })
  }
 /*returns the js code for displaying the inputs and processing the data to view all
    established pickup location and order relationships. Also has buttons linked to updating 
    and deleting a specified pickup instance*/
  return (
    <div>
      <Nav></Nav>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Pickup ID</Table.HeaderCell>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Pickup Location ID</Table.HeaderCell>
            <Table.HeaderCell>Pickup Start Time</Table.HeaderCell>
            <Table.HeaderCell>Pickup End Time</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.pickup_id}</Table.Cell>
                <Table.Cell>{data.order_id}</Table.Cell>
                <Table.Cell>{data.pickup_location_id}</Table.Cell>
                <Table.Cell>{data.pickup_start_time}</Table.Cell>
                <Table.Cell>{data.pickup_end_time}</Table.Cell>
                <Link to='/updatepickups'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.pickup_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ReadPickup;
