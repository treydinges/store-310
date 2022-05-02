/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Charles Dinges
  -Purpose of this Page:
    Simple form for a user to enter their credentials and log in to the system.
--------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

function Login() {
  let history = useHistory();
  // store the form fields in the state
  const [user_phone, set_user_phone] = useState('');
  const [user_password, set_user_password] = useState('');

  const setData = (id, is_admin) => {
    // store the user id and admin status for use in the rest of the app
    localStorage.setItem('user_id', id);
    localStorage.setItem('user_is_admin', is_admin);
  }

  // API call to get the user for the items entered in the form
  // if the login is correct, the user is rerouted to the home page
  // otherwise, nothing happens and the user needs to try again
  const verifyLogin = () => {
    axios.put('/api/get/userlogin', {
      user_phone,
      user_password,
    }).then((response) => {
      if (response.data[0].user_id) {
        setData(response.data[0].user_id, response.data[0].user_is_admin);
        history.push('/');
      }
    }).catch((err) => console.log(err))
  }

  // render the form for entering the user credentials as well as the submit button
  return (
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>Phone Number</label>
          <input placeholder='Phone Number' onChange={(e) => set_user_phone(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' onChange={(e) => set_user_password(e.target.value)}/>
        </Form.Field>
        <Button onClick={verifyLogin} type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default Login;