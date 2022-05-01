/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Sunhee Kim
  -Purpose of this Page: 
    The entity pickup location is tied to a users orders through the bridge 
    entity called pickups. This script will allow the user to edit the values 
    from a previously created instance of pickup. This was mainly used for 
    testing purposes to ensure the pickups entity of the database was setup 
    correctly and functional in all commands.
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

/*Function UpdatePickup - will reference the api for a created pickup through sql 
commands and interface with the user. The pickup ID, order ID, pickup location ID, start time for 
pickup, and end time for pickup will all be reentered as js inputs by user and passed 
in as arguments (from the customer) to the function updatepickups */ 
function UpdatePickup() {

  /*sets variables accessed later to a default empty string state or null value*/
  let history = useHistory();
  const [pickup_id, set_pickup_id] = useState(null);
  const [order_id, set_order_id] = useState('');
    const [pickup_location_id, set_pickup_location_id] = useState('');
    const [pickup_start_time, set_pickup_start_time] = useState('');
    const [pickup_end_time, set_pickup_end_time] = useState('');

  /*will alter the local storage attributes of an instance of the pickups entity and update using 
  the associated set functions for the given attribute*/
  useEffect(() => {
    set_pickup_id(localStorage.getItem('pickup_id'));
    set_order_id(localStorage.getItem('order_id'));
    set_pickup_location_id(localStorage.getItem('pickup_location_id'));
    set_pickup_start_time(localStorage.getItem('pickup_start_time'));
    set_pickup_end_time(localStorage.getItem('pickup_end_time'));

  }, []);
  /*function to access the api function udpatepickups for direct sql command 
    interaction with database. Arguments collected by inputs from user will be passed 
    into the api command to edit any of the non-primary key attributes of an instance 
    of the pickup entity*/
  const updateAPIData = () => {
    axios.put('/api/put/updatepickups', {
        pickup_id,
        order_id,
        pickup_location_id,
        pickup_start_time,
        pickup_end_time,

    }).then(() => {
      history.push('/readpickups');
    }).catch((err) => console.log(err))
  }
  /*returns the js code for receiving the inputs and processing the data to updating an
    established pickup location and order relationship*/
  return (
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>Order ID</label>
          <input placeholder={order_id} onChange={(e) => set_order_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Pickup Location ID</label>
          <input placeholder={pickup_location_id} onChange={(e) => set_pickup_location_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Start Time</label>
          <input placeholder={pickup_start_time} onChange={(e) => set_pickup_start_time(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>End Time</label>
          <input placeholder={pickup_end_time} onChange={(e) => set_pickup_end_time(e.target.value)}/>
        </Form.Field>
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
  )
}

export default UpdatePickup;
