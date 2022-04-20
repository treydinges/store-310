import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function UpdateUser() {
  let history = useHistory();
  const [user_id, set_user_id] = useState(null);
  const [user_fname, set_user_fname] = useState('');
  const [user_lname, set_user_lname] = useState('');
  const [user_phone, set_user_phone] = useState('');
  const [user_password, set_user_password] = useState('');
  const [user_is_admin, set_user_is_admin] = useState('false');

  useEffect(() => {
    set_user_id(localStorage.getItem('user_id'));
    set_user_fname(localStorage.getItem('user_fname'));
    set_user_lname(localStorage.getItem('user_lname'));
    set_user_phone(localStorage.getItem('user_phone'));
    set_user_password(localStorage.getItem('user_password'));
    set_user_is_admin(localStorage.getItem('user_is_admin'));
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
      history.push('/readuser');
    }).catch((err) => console.log(err))
  }

  return (
    <div>
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