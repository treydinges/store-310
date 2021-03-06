/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Nathaniel Wang
  -Purpose of this Page: The purpose of this page is part of the category feature set
    for the admin user, specifically the insert feature of the feature set. Where the admin
    is able to create categories for items to be categorized in.
--------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

function CreateCategory() {
  let history = useHistory();
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [category_name, set_category_name] = useState('');

  const postData = () => {
    axios.post('/api/post/createcategory', {
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
          <input placeholder='Category Name' onChange={(e) => set_category_name(e.target.value)}/>
        </Form.Field>
        <Button onClick={postData} type='submit'>Submit</Button>
      </Form>
    </div>
    :
    <h2>You are not an admin!</h2>
  )
}

export default CreateCategory;