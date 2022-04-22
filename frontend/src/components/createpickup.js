import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import Nav from './nav';

function CreatePickup() {
    let history = useHistory();
    const [order_id, set_order_id] = useState('');
    const [pickup_location_id, set_pickup_location_id] = useState('');
    const [pickup_start_time, set_pickup_start_time] = useState('');
    const [pickup_end_time, set_pickup_end_time] = useState('');

    const postData = () => {
        axios.post('/api/post/createpickups', {
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
            <Nav></Nav>
            <Form>
                <Form.Field>
                    <label>Order ID</label>
                    <input placeholder='Order ID' onChange={(e) => set_order_id(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Pickup Location ID </label>
                    <input placeholder='Pickup Location ID' onChange={(e) => set_pickup_location_id(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Pickup Start Time</label>
                    <input placeholder='Start Time' onChange={(e) => set_pickup_start_time(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Pickup End Time</label>
                    <input placeholder='End Time' onChange={(e) => set_pickup_end_time(e.target.value)}/>
                </Form.Field>
     
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default CreatePickup;