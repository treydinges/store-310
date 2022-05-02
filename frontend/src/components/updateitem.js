/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Charles Dinges
  -Purpose of this Page:
    Updates an item with the parameters given in the form. This page is only accessible
    by a user with admin permissions. Once the item detiails are to the user's liking, 
    they can press the submit button which will call the API and update the item 
    within the database.
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

function UpdateItem() {
  const user_is_admin = localStorage.getItem('user_is_admin');
  let history = useHistory();
  // item parameters to send to the API
  const [item_id, set_item_id] = useState(null);
  const [category_id, set_category_id] = useState(null);
  const [item_name, set_item_name] = useState('');
  const [item_price, set_item_price] = useState(0);
  const [item_qoh, set_item_qoh] = useState(0);
  const [item_description, set_item_description] = useState('');

  useEffect(() => {
    // used to figure out which item needs to be updated
    set_item_id(localStorage.getItem('item_id'));
    set_category_id(localStorage.getItem('category_id'));
    set_item_name(localStorage.getItem('item_name'));
    set_item_price(localStorage.getItem('item_price'));
    set_item_qoh(localStorage.getItem('item_qoh'));
    set_item_description(localStorage.getItem('item_description'));
  }, []);

  const updateAPIData = () => {
    // API call to update the item with all the necessary details
    axios.put('/api/put/updateitem', {
      item_id,
      category_id,
      item_name,
      item_price,
      item_qoh,
      item_description,
    }).then(() => {
      history.push('/readitem');
    }).catch((err) => console.log(err))
  }

  // conditionally rendered form for entering item details
  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>Category ID</label>
          <input placeholder={category_id} onChange={(e) => set_category_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item Name</label>
          <input placeholder={item_name} onChange={(e) => set_item_name(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item Price</label>
          <input placeholder={item_price} onChange={(e) => set_item_price(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Quantity on Hand</label>
          <input placeholder={item_qoh} onChange={(e) => set_item_qoh(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item Description</label>
          <input placeholder={item_description} onChange={(e) => set_item_description(e.target.value)}/>
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

export default UpdateItem;
