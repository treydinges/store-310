/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Sunhee Kim
  -Purpose of this Page: 
    The entity pickup location is tied to a users orders through the bridge 
    entity called pickups. A pickup location can be created by an admin to provide
    more spots for customer order pickups. The customer would not have access to
    a create pickup location feature. This script will allow an admin to create 
    a new instance of a pickup location for users to later view as options 
    at checkout.
--------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

/*Function CreatePickupLocation - will reference the api for creating pickup location through  
sql commands and interface with the admin the pickup location parking spot will be 
entered as js inputs by user and passed in as an argument (from the administrator)
 to the function createpickuplocation */ 
function CreatePickupLocation() {
  /*sets variables accessed later to a default empty string state - includes a 
  boolean that states whether the user is an admin (to restrict access rights) and sets
  default assignments for the pickup location parking spot value*/
  const user_is_admin = localStorage.getItem('user_is_admin');
  let history = useHistory();
  const [pickup_location_parking_spot, set_pickup_location_parking_spot] = useState('');
  
  /*function to access the api function createpickuplocation for direct sql command 
  interaction with database. Arguments collected by inputs from user will be passed 
  into the api command*/
  const postData = () => {
    axios.post('/api/post/createpickuplocation', {
      pickup_location_parking_spot,
    }).then(() => {
      history.push('/readpickuplocation');
    }).catch((err) => console.log(err))
  }

  /*returns the js code for receiving the inputs and processing the data to create a 
  new pickup location*/
  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>Pickup Locations</label>
          <input placeholder='Pickup Spot ' onChange={(e) => set_pickup_location_parking_spot(e.target.value)}/>
        </Form.Field>
        <Button onClick={postData} type='submit'>Submit</Button>
      </Form>
    </div>
    :
    <h2>You are not an admin!</h2>
  )
}

export default CreatePickupLocation;