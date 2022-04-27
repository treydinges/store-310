/* ----------------------------------------------------------------------------------
    -Team Number: Team 16
    -Project: Grocery Store Database and UI
    -Page was coded by: Sunhee Kim
    -Purpose of this Page: 
        The entity pickup location is tied to a users orders through the bridge 
        entity called pickups. A pickup location can be created by an admin to provide
        more spots for customer order pickups. The customer would not have access to
        an update pickup location feature. This script will allow an admin to edit 
        a created instance of a pickup location for users to later view as options 
        at checkout.

   --------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

/*Function UpdatePickupLocation - will reference the api for a created pickup location 
through sql commands and interface with the user. The pickup location ID and pickup  
location parking spot will all be reentered as js inputs by user and passed in as an argument 
(from the administrator) to the function updatepickuplocation */ 
function UpdatePickupLocation() {

  /*sets variables accessed later to a default empty string state - includes a 
    boolean that states whether the user is an admin (to restrict access rights), 
    the pickup location parking spot value, and pickup location id (primary key)*/
  const user_is_admin = localStorage.getItem('user_is_admin');
  let history = useHistory();
  const [pickup_location_id, set_pickup_location_id] = useState(null);
  const [pickup_location_parking_spot, set_pickup_location_parking_spot] = useState('');

  /*will alter the local storage attributes of an instance of the pickup location entity 
  and update using the associated set functions for the given attribute*/
  useEffect(() => {
    set_pickup_location_id(localStorage.getItem('pickup_location_id'));
    set_pickup_location_parking_spot(localStorage.getItem('pickup_location_parking_spot'));
  }, []);

  /*function to access the api function udpatepickuplocation for direct sql command 
    interaction with database. Arguments collected by inputs from admin will be passed 
    into the api command to edit any of the non-primary key attributes of an instance 
    of the pickup location entity*/
  const updateAPIData = () => {
    axios.put('/api/put/updatepickuplocation', {
      pickup_location_id,
      pickup_location_parking_spot,
    }).then(() => {
      history.push('/readpickuplocation');
    }).catch((err) => console.log(err))
  }

  /*returns the js code for receiving the inputs and processing the data to updating a
    pickup location entity instance*/
  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
      <label>Parking Spot</label>
      <Form>
        <Form.Field>
          <input placeholder={set_pickup_location_parking_spot} onChange={(e) => set_pickup_location_parking_spot(e.target.value)}/>
        </Form.Field>
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
    :
    <div>
      <Nav></Nav>
      <h2>You are not an admin!</h2>
    </div>
  )
}

export default UpdatePickupLocation;
