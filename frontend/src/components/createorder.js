/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Sunhee Kim
  -Purpose of this Page: 
    A database entity order instance can be created by a customer and added to 
    the database at checkout.  This script will allow a customer to create 
    an order, with a bridging entity orderline used to establish a relationship 
    between the order and items the customer wishes to checkout. The admin would 
    not have access to this functionality.
--------------------------------------------------------------------------------*/
import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import ReadOrder from './readorder';
import Nav from './nav';

/*Function history - will reference the api for creating an order through  
sql commands and interface with the admin the puserID and order datetime where the order is 
submitted in checkoutwill will bothbe entered as js inputs by user and passed in as an 
argument (from the customer) to the function createorder */ 
function CreateOrder() {

  /*sets variables accessed later to a default empty string state - includes a 
    boolean that states whether the user is an admin (to restrict access rights) and sets
    default assignements for the order_id, user_id, and order_datetime values*/
  let history = useHistory();
  const [order_id, set_order_id] = useState(null);
  const [user_id, set_user_id] = useState(0);
  const [order_datetime, set_order_datetime] = useState('');
 
  /*function to access the api function createorder for direct sql command 
    interaction with database. Arguments collected by inputs from user will be passed 
    into the api command*/
  const postData = () => {
    axios.post('/api/post/createorder', {
      order_id,
      user_id,
      order_datetime,
    }).then(() => {
      history.push('/readorder');
    }).catch((err) => console.log(err))
  }

  /*returns the js code for receiving the inputs and processing the data to create a 
    new order instance*/
  return (
   
    <div>
      <Nav></Nav>
      <ReadOrder></ReadOrder>
      <br></br>
      <Form>
        <Form.Field>
          <label>Order ID</label>
          <input placeholder='Order ID' onChange={(e) => set_order_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>User ID</label>
          <input placeholder='User ID' onChange={(e) => set_user_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Order Datetime</label>
          <input placeholder='Order Datetime' onChange={(e) => set_order_datetime(e.target.value)}/>
        </Form.Field>
     
    
        <Button onClick={postData} type='submit'>Submit</Button>
      </Form>
    </div>
  
  )
}

export default CreateOrder;