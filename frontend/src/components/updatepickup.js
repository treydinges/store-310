import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';


function UpdatePickup() {
  let history = useHistory();
  const [pickup_id, set_pickup_id] = useState(null);
  const [order_id, set_order_id] = useState('');
    const [pickup_location_id, set_pickup_location_id] = useState('');
    const [pickup_start_time, set_pickup_start_time] = useState('');
    const [pickup_end_time, set_pickup_end_time] = useState('');


  useEffect(() => {
    set_pickup_id(localStorage.getItem('pickup_id'));
    set_order_id(localStorage.getItem('order_id'));
    set_pickup_location_id(localStorage.getItem('pickup_location_id'));
    set_pickup_start_time(localStorage.getItem('pickup_start_time'));
    set_pickup_end_time(localStorage.getItem('pickup_end_time'));

  }, []);

  const updateAPIData = () => {
    axios.put('/api/put/updatepickups', {
        pickup_id,
        order_id,
        pickup_location_id,
        pickup_start_time,
        pickup_end_time,

    }).then(() => {
      history.push('/readpickups');
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Order ID</label>
          <input placeholder={order_id} onChange={(e) => set_order_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Pickup Location ID</label>
          <input placeholder={pickup_location_id} onChange={(e) => set_pickup_location_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Start Time</label>
          <input placeholder={pickup_start_time} onChange={(e) => set_pickup_start_time(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>End Time</label>
          <input placeholder={pickup_end_time} onChange={(e) => set_pickup_end_time(e.target.value)}/>
        </Form.Field>
   
   
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
  )
}

export default UpdatePickup;
