/* ----------------------------------------------------------------------------------
    -Team Number: Team 16
    -Project: Grocery Store Database and UI
    -Page was coded by: Sunhee Kim
    -Purpose of this Page: 
        The entity orders is tied to a items through the bridge 
        entity called orderline. This script will allow the user to edit the values 
        from a previously created instance of orderline.

        This was mainly used for testing purposes to ensure the orderline entity of
        the database was setup correctly and functional in all commands.

--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';
/*Function UpdateOrderline - will reference the api for a create orderline through sql 
commands and interface with the user. The orderline ID, item ID,  order id, and 
item quantity will all be reentered as js inputs by user and passed 
in as arguments (from the customer) to the function updateorderline */ 
function UpdateOrderline() {

  /*sets variables accessed later to a default 0 or null value*/
  let history = useHistory();
  const [orderline_id, set_orderline_id] = useState(null);
  const [item_id, set_item_id] = useState(0);
  const [order_id, set_order_id] = useState(0);
  const [item_quantity, set_item_quantity] = useState(0);
  
  /*will alter the local storage attributes of an instance of the orderlines entity
 and update using the associated set functions for the given attribute*/
  useEffect(() => {
    set_orderline_id(localStorage.getItem('orderline_id'));
    set_item_id(localStorage.getItem('item_id'));
    set_order_id(localStorage.getItem('order_id'));
    set_item_quantity(localStorage.getItem('item_quantity'));
  }, []);

  /*function to access the api function updateorderline for direct sql command 
    interaction with database. Arguments collected by inputs from user will be passed 
    into the api command to edit any of the non-primary key attributes of an instance 
    of the orderline entity*/
  const updateAPIData = () => {
    axios.put('/api/put/updateorderline', {
        orderline_id,
        item_id,
        order_id,
        item_quantity
    }).then(() => {
      history.push('/readorderlines');
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>Item ID</label>
          <input placeholder={item_id} onChange={(e) => set_item_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Order ID</label>
          <input placeholder={order_id} onChange={(e) => set_order_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item Quantity</label>
          <input placeholder={item_quantity} onChange={(e) => set_item_quantity(e.target.value)}/>
        </Form.Field>
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
  )
}

export default UpdateOrderline;
