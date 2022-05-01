import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

function UpdateUser() {
  let history = useHistory();
  const user_id = localStorage.getItem('user_id');
  const [user_fname, set_user_fname] = useState('');
  const [user_lname, set_user_lname] = useState('');
  const [user_phone, set_user_phone] = useState('');
  const [user_password, set_user_password] = useState('');
  const [user_is_admin, set_user_is_admin] = useState('false');

  useEffect(() => {
    axios.put('/api/get/getusers', {
      user_id
    }).then((response) => {
      set_user_fname(response.data[0].user_fname);
      set_user_lname(response.data[0].user_lname);
      set_user_phone(response.data[0].user_phone);
      set_user_password(response.data[0].user_password);
      set_user_is_admin(response.data[0].user_is_admin);
    }).catch((err) => console.log(err))
  }, []);

  const updateAPIData = () => {
    axios.put('/api/put/updateuser', {
      user_id,
      user_fname,
      user_lname,
      user_phone,
      user_password,
      user_is_admin,
    }).then(() => {
      history.push('/');
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder={user_fname} onChange={(e) => set_user_fname(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder={user_lname} onChange={(e) => set_user_lname(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <input placeholder={user_phone} onChange={(e) => set_user_phone(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' onChange={(e) => set_user_password(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Is Admin</label>
          <input placeholder={user_is_admin} onChange={(e) => set_user_is_admin(e.target.value)}/>
        </Form.Field>
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
  )
}

export default UpdateUser;