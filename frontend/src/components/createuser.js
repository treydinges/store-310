import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function CreateUser() {
    let history = useHistory();
    const [user_fname, setFirstName] = useState('');
    const [user_lname, setLastName] = useState('');
    const [user_phone, setPhoneNum] = useState('');
    const [user_password, setPassword] = useState('');
    const [user_is_admin, setIsAdmin] = useState('false');
    const postData = () => {
        axios.post('/api/post/createuser', {
            user_fname,
            user_lname,
            user_phone,
            user_password,
            user_is_admin,
        }).then(() => {
            history.push('/readuser');
        }).catch((err) => console.log(err))
    }

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Phone Number</label>
                    <input placeholder='Phone Number' onChange={(e) => setPhoneNum(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Is Admin</label>
                    <input type="checkbox" onClick={(e) => setIsAdmin(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default CreateUser;