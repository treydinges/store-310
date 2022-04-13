import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function UpdatePickupLocation() {
  let history = useHistory();
  const [pickup_location_id, set_pickup_location_id] = useState(null);
  const [pickup_location_parking_spot, set_pickup_location_parking_spot] = useState('');

  useEffect(() => {
    set_pickup_location_id(localStorage.getItem('pickup_location_id'));
    set_pickup_location_parking_spot(localStorage.getItem('pickup_location_parking_spot'));
  }, []);

  const updateAPIData = () => {
    axios.put('/api/put/updatepickuplocation', {
      pickup_location_id,
      pickup_location_parking_spot,
    }).then(() => {
      history.push('/readpickuplocation');
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <label>Parking Spot</label>
      <Form>
        <Form.Field>
          
          <input placeholder={set_pickup_location_parking_spot} onChange={(e) => set_pickup_location_parking_spot(e.target.value)}/>
        </Form.Field>
      
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
  )
}

export default UpdatePickupLocation;
