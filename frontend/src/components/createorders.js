import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import ReadOrders from './readorders';

function CreateOrders() {
  let history = useHistory();
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [order_id, set_order_id] = useState(null);
  const [user_id, set_user_id] = useState(0);
  const [order_datetime, set_order_datetime] = useState('');
 

  const postData = () => {
    axios.post('/api/post/createorder', {

        order_id,
        user_id,
        order_datetime,
  
    }).then(() => {
      history.push('/readorders');
    }).catch((err) => console.log(err))
  }

  return (
   
    <div>
      <ReadOrders></ReadOrders>
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

export default CreateOrders;