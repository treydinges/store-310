import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function UpdateOrder() {
  let history = useHistory();
  const [order_id, set_order_id] = useState(null);
  const [user_id, set_user_id] = useState(0);
  const [order_datetime, set_order_datetime] = useState('');


  useEffect(() => {
    set_order_id(localStorage.getItem('order_id'));
    set_user_id(localStorage.getItem('user_id'));
    set_order_datetime(localStorage.getItem('order_datetime'));
  }, []);

  const updateAPIData = () => {
    axios.put('/api/put/updateorders', {
        order_id,
        user_id,
        order_datetime
    }).then(() => {
      history.push('/readorders');
    }).catch((err) => console.log(err))
  }

  return (
    <div>
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
