/* ----------------------------------------------------------------------------------
    -Team Number: Team 16
    -Project: Grocery Store Database and UI
    -Page was coded by: Sunhee Kim
    -Purpose of this Page: 
        A database entity order instance can be created by a customer and added to 
        the database at checkout.  This script will allow a customer to update 
        a sepcified order and its attributes.

        This was mainly used for testing purposes to ensure the order entity of
        the database was setup correctly and functional in all commands.
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

/*Function UpdateOrder - will reference the api for a created order through sql 
commands and interface with the user. The order id, user id, and order datetime
 will all be reentered as js inputs by user and passed in as an argument 
(from the user) to the function updateorders */ 
function UpdateOrder() {

  /*sets variables accessed later to a default 0, empty string, or null value*/
  let history = useHistory();
  const [order_id, set_order_id] = useState(null);
  const [user_id, set_user_id] = useState(0);
  const [order_datetime, set_order_datetime] = useState('');


  /*will alter the local storage attributes of an instance of the order entity 
  and update using the associated set functions for the given attribute*/
  useEffect(() => {
    set_order_id(localStorage.getItem('order_id'));
    set_user_id(localStorage.getItem('user_id'));
    set_order_datetime(localStorage.getItem('order_datetime'));
  }, []);


  /*function to access the api function updateorders for direct sql command 
    interaction with database. Arguments collected by inputs from admin will be passed 
    into the api command to edit any of the non-primary key attributes of an instance 
    of the order entity*/
  const updateAPIData = () => {
    axios.put('/api/put/updateorders', {
        order_id,
        user_id,
        order_datetime
    }).then(() => {
      history.push('/readorders');
    }).catch((err) => console.log(err))
  }

   /*returns the js code for receiving the inputs and processing the data to updating an
    order entity instance*/
  return (
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>User ID</label>
          <input placeholder={user_id} onChange={(e) => set_user_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Order Datetime</label>
          <input placeholder={order_datetime} onChange={(e) => set_order_datetime(e.target.value)}/>
        </Form.Field>
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
  )
}

export default UpdateOrder;
