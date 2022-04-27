/* ----------------------------------------------------------------------------------
    -Team Number: Team 16
    -Project: Grocery Store Database and UI
    -Page was coded by: Sunhee Kim
    -Purpose of this Page: 
        The entity orders is tied to a items through the bridge 
        entity called orderline. This script will allow the customer, while selecting
        items for their virtual cart, to create an instance of orderline. 
        The admin type of user would not have anything to change with this entity 
        and will not have access to the functionality of orderline creation.

--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import ReadCategory from './readorderline';
import Nav from './nav';

/*Function CreateOrderline - will reference the api for creating orderlines through sql 
commands and interface with the user. The item  ID, order ID, and item quantity will all 
be entered as js inputs by user and passed in as arguments (from the customer) to the 
function createorderline */ 
function CreateOrderline() {
  const [item_qoh, set_item_qoh] = useState(0);

  /*useEffect function is used to alter the item quantity on hand with each item added*/ 
  useEffect(() => {
    set_item_id(localStorage.getItem('item_id'));
    set_item_qoh(localStorage.getItem('item_qoh'));
  }, []);


  /*sets variables accessed later to a default empty or 0*/
  let history = useHistory();

  const [item_id, set_item_id] = useState(0);
  const [order_id, set_order_id] = useState(0);
  const [item_quantity, set_item_quantity] = useState(0);

  /*function to access the api function createorderline for direct sql command 
    interaction with database. Arguments collected by inputs from user will be passed 
    into the api command*/
  const postData = () => {
    axios.post('/api/post/createorderline', {
  
        item_id,
        order_id,
        item_quantity,
  
    }).then(() => {
      history.push('/readorderlines');
    }).catch((err) => console.log(err))
  }
  
  /*returns the js code for receiving the inputs and processing the data to create a 
    new order and item relationship*/
  return (
    <div>
      <Nav></Nav>
      <ReadCategory></ReadCategory>
      <br></br>
      <Form>
        <Form.Field>
          <label>Item ID</label>
          <input placeholder='Item ID' onChange={(e) => set_item_id(e.target.value)}/>
          <input placeholder={item_id} onChange={(e) => set_item_id(e.target.value)}/>
        
        </Form.Field>
        <Form.Field>
          <label>Order ID</label>
          <input placeholder='Order ID' onChange={(e) => set_order_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item Quantity</label>
          <input placeholder='Item Quantity' onChange={(e) => set_item_quantity(e.target.value)}/>
          <input placeholder={item_qoh} onChange={(e) => set_item_qoh(e.target.value)}/>
        </Form.Field>
    
        <Button onClick={postData} type='submit'>Submit</Button>
      </Form>
    </div>
  
  )
}

export default CreateOrderline;