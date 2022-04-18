import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function Login() {
  let history = useHistory();
  const [user_phone, set_user_phone] = useState('');
  const [user_password, set_user_password] = useState('');

  const setData = (id, is_admin) => {
    localStorage.setItem('user_id', id);
    localStorage.setItem('user_is_admin', is_admin);
  }

  const verifyLogin = () => {
    axios.put('/api/get/userlogin', {
      user_phone,
      user_password,
    }).then((response) => {
      if (response.data[0].user_id) {
        setData(response.data[0].user_id, response.data[0].user_is_admin);
        history.push('/readfavorite');
      }
    }).catch((err) => console.log(err))
  }

  return (
    <div>
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