/* ----------------------------------------------------------------------------------
    -Team Number: Team 16
    -Project: Grocery Store Database and UI
    -Page was coded by: Sunhee Kim
    -Purpose of this Page: 
        The entity pickup location is tied to a users orders through the bridge 
        entity called pickups. This script will allow the customer, when an order is 
        complete, to create an instance of pickup. The admin type of user would not
        have anything to change with this entity and will not have access to the 
        functionality of pickup creation.

   --------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import Nav from './nav';

/*Function CreatePickup - will reference the api for creating pickup through sql 
commands and interface with the user. The order ID, pickup location ID, start time for 
pickup, and end time for pickup will all be entered as js inputs by user and passed 
in as arguments (from the customer) to the function createpickups */ 
function CreatePickup() {
    let history = useHistory();
    /*sets variables accessed later to a default empty string state*/
    const [order_id, set_order_id] = useState('');
    const [pickup_location_id, set_pickup_location_id] = useState('');
    const [pickup_start_time, set_pickup_start_time] = useState('');
    const [pickup_end_time, set_pickup_end_time] = useState('');

    /*function to access the api function createpickups for direct sql command 
    interaction with database. Arguments collected by inputs from user will be passed 
    into the api command*/
    const postData = () => {
        axios.post('/api/post/createpickups', {
            order_id,
            pickup_location_id,
            pickup_start_time,
            pickup_end_time,
     
        }).then(() => {
            history.push('/readpickup');
        }).catch((err) => console.log(err))
    }
    /*returns the js code for receiving the inputs and processing the data to create a 
    new pickup location and order relationship*/
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