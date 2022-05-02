/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Sunhee Kim
  -Purpose of this Page: 
    The entity pickup location is tied to a users orders through the bridge 
    entity called pickups. Every order a user makes will have a user_id 
    linked to the order. As part of the Admin Functionality, the admin should view
    the previous and current pickups of a given user.
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Nav from './nav';

/*Function ReadUserPickups - will reference the api for a getuserpickups 
through sql commands through the getData function to retrieve all the values in
 the pickups organized by user_id */
function ReadUserPickups() {

    let history = useHistory();
    const user_is_admin = localStorage.getItem('user_is_admin');
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
      getData();
    }, [])

  
  

   /*Function getData - will reference the api for a getuserpickups through sql 
  commands. The user_id, order_id, pickup_id, pickup_location_id, 
  pickup_start_time, pickup_end_time for all existing values in a joined table
  of orders and pickups will be shown as outputs for 
  the user to view*/
  const getData = () => {
    axios.get('/api/get/getuserpickups')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }
 

 /*returns the js code for displaying the inputs and processing the data to view all
    established pickup location entity instances. Also has buttons linked to updating 
    and deleting a specified pickup location instance*/
  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
   
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User ID</Table.HeaderCell>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Pickup ID</Table.HeaderCell>
            <Table.HeaderCell>Pickup Location ID</Table.HeaderCell>
            <Table.HeaderCell>Pickup Start Time</Table.HeaderCell>
            <Table.HeaderCell>Pickup End Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.user_id}</Table.Cell>
                <Table.Cell>{data.order_id}</Table.Cell>
                <Table.Cell>{data.pickup_id}</Table.Cell>
                <Table.Cell>{data.pickup_location_id}</Table.Cell>
                <Table.Cell>{data.pickup_start_time}</Table.Cell>
                <Table.Cell>{data.pickup_end_time}</Table.Cell>

               
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

export default ReadUserPickups;
