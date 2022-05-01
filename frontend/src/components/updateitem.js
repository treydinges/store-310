/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: 
  -Purpose of this Page: 
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

function UpdateItem() {
  const user_is_admin = localStorage.getItem('user_is_admin');
  let history = useHistory();
  const [item_id, set_item_id] = useState(null);
  const [category_id, set_category_id] = useState(null);
  const [item_name, set_item_name] = useState('');
  const [item_price, set_item_price] = useState(0);
  const [item_qoh, set_item_qoh] = useState(0);
  const [item_description, set_item_description] = useState('');

  useEffect(() => {
    set_item_id(localStorage.getItem('item_id'));
    set_category_id(localStorage.getItem('category_id'));
    set_item_name(localStorage.getItem('item_name'));
    set_item_price(localStorage.getItem('item_price'));
    set_item_qoh(localStorage.getItem('item_qoh'));
    set_item_description(localStorage.getItem('item_description'));
  }, []);

  const updateAPIData = () => {
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
