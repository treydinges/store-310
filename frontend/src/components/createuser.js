/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Charles Dinges
  -Purpose of this Page:
    Creates a user with the parameters given in the form. Once the user enters the
    desired details, they can press the submit button which will call the API 
    and create the user within the database.
--------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

function CreateUser() {
  let history = useHistory();
  // user parameters to send to the API
  const [user_fname, set_user_fname] = useState('');
  const [user_lname, set_user_lname] = useState('');
  const [user_phone, set_user_phone] = useState('');
  const [user_password, set_user_password] = useState('');
  const [user_is_admin, set_user_is_admin] = useState('false');

  // API call to create the user
  const postData = () => {
    axios.post('/api/post/createuser', {
      user_fname,
      user_lname,
      user_phone,
      user_password,
      user_is_admin,
    }).then(() => {
      history.push('/login');
    }).catch((err) => console.log(err))
  }

  // form for entering user details and creating the user
  return (
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' onChange={(e) => set_user_fname(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' onChange={(e) => set_user_lname(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <input placeholder='Phone Number' onChange={(e) => set_user_phone(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' onChange={(e) => set_user_password(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Is Admin</label>
          <input placeholder='true / false' onChange={(e) => set_user_is_admin(e.target.value)}/>
        </Form.Field>
        <Button onClick={postData} type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default CreateUser;