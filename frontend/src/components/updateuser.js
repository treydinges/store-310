import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function UpdateUser() {
  let history = useHistory();
  const [user_id, setID] = useState(null);
  const [user_fname, setFirstName] = useState('');
  const [user_lname, setLastName] = useState('');
  const [user_phone, setPhoneNum] = useState('');
  const [user_password, setPassword] = useState('');
  const [user_is_admin, setIsAdmin] = useState('');

  useEffect(() => {
    setID(localStorage.getItem('ID'));
    setFirstName(localStorage.getItem('First Name'));
    setLastName(localStorage.getItem('Last Name'));
    setPhoneNum(localStorage.getItem('Phone Number'));
    setPassword(localStorage.getItem('Password'));
    setIsAdmin(localStorage.getItem('IsAdmin'));
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
          <input placeholder={user_fname} onChange={(e) => setFirstName(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder={user_lname} onChange={(e) => setLastName(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <input placeholder={user_phone} onChange={(e) => setPhoneNum(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </Form.Field>
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
  )
}

export default UpdateUser;
