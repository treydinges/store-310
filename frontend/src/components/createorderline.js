
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import ReadCategory from './readorderline';


function CreateOrderline() {
  const [item_qoh, set_item_qoh] = useState(0);
  useEffect(() => {
    set_item_id(localStorage.getItem('item_id'));
    set_item_qoh(localStorage.getItem('item_qoh'));
  }, []);

const updateAPIData = () => {
  axios.put('/api/put/updateItemsWithOrderlineCreation', {
    item_id,
    item_qoh,
  }).then(() => {
    history.push('/readitem');
  }).catch((err) => console.log(err))
}

  let history = useHistory();

  const [item_id, set_item_id] = useState(0);
  const [order_id, set_order_id] = useState(0);
  const [item_quantity, set_item_quantity] = useState(0);

  const postData = () => {
    axios.post('/api/post/createorderline', {
  
        item_id,
        order_id,
        item_quantity,
  
    }).then(() => {
      history.push('/readorderlines');
    }).catch((err) => console.log(err))
  }
  const postData2 = () => {
    axios.post('/api/post/updateItemsWithOrderlineCreation', {
  
      item_id,
      order_id,
      item_quantity,
  
    }).then(() => {
      history.push('/readorderlines');
    }).catch((err) => console.log(err))
  }
  
  
  return (
   
    <div>
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