import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function UpdateOrderlines() {
  let history = useHistory();
  const [orderline_id, set_orderline_id] = useState(null);
  const [item_id, set_item_id] = useState(0);
  const [order_id, set_order_id] = useState(0);
  const [item_quantity, set_item_quantity] = useState(0);

  useEffect(() => {
    set_orderline_id(localStorage.getItem('orderline_id'));
    set_item_id(localStorage.getItem('item_id'));
    set_order_id(localStorage.getItem('order_id'));
    set_item_quantity(localStorage.getItem('item_quantity'));
  }, []);

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

export default UpdateOrderlines;
