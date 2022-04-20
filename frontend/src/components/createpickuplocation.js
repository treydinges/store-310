import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function CreatePickupLocation() {
    const user_is_admin = localStorage.getItem('user_is_admin');
    let history = useHistory();
    const [pickup_location_parking_spot, set_pickup_location_parking_spot] = useState('');
    const postData = () => {
        axios.post('/api/post/createpickuplocation', {
            pickup_location_parking_spot,
        }).then(() => {
            history.push('/readpickuplocation');
        }).catch((err) => console.log(err))
    }

    return (
        user_is_admin === 'true' ?
        <div>
            <Form>
                <Form.Field>
                    <label>Pickup Locations</label>
                    <input placeholder='Pickup Spot ' onChange={(e) => set_pickup_location_parking_spot(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
        :
        <h2>You are not an admin!</h2>
    )
}

export default CreatePickupLocation;