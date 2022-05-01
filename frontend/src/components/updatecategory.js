/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: 
  -Purpose of this Page: 
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

function UpdateCategory() {
  const user_is_admin = localStorage.getItem('user_is_admin');
  let history = useHistory();
  const [category_id, set_category_id] = useState(null);
  const [category_name, set_category_name] = useState('');

  useEffect(() => {
    set_category_id(localStorage.getItem('category_id'));
    set_category_name(localStorage.getItem('category_name'));
  }, []);

  const updateAPIData = () => {
    axios.put('/api/put/updatecategory', {
      category_id,
      category_name,
    }).then(() => {
      history.push('/readcategory');
    }).catch((err) => console.log(err))
  }

  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
      <Form>
        <Form.Field>
          <label>Category Name</label>
          <input placeholder={category_name} onChange={(e) => set_category_name(e.target.value)}/>
        </Form.Field>
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
    :
    <div>
      <Nav></Nav>
      <h2>You are not an admin!</h2>
    </div>
  )
}

export default UpdateCategory;