import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import ReadCategory from './readcategory';

function CreateItem() {
  let history = useHistory();
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [category_id, set_category_id] = useState(null);
  const [item_name, set_item_name] = useState('');
  const [item_price, set_item_price] = useState(0);
  const [item_qoh, set_item_qoh] = useState(0);
  const [item_description, set_item_description] = useState('');

  const postData = () => {
    axios.post('/api/post/createitem', {
      category_id,
      item_name,
      item_price,
      item_qoh,
      item_description,
    }).then(() => {
      history.push('/readitem');
    }).catch((err) => console.log(err))
  }

  return (
    user_is_admin === 'true' ?
    <div>
      <ReadCategory></ReadCategory>
      <br></br>
      <Form>
        <Form.Field>
          <label>Category ID</label>
          <input placeholder='Category ID' onChange={(e) => set_category_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item Name</label>
          <input placeholder='Item Name' onChange={(e) => set_item_name(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item Price</label>
          <input placeholder='Item Price' onChange={(e) => set_item_price(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Quantity on Hand</label>
          <input placeholder='Quantity on Hand' onChange={(e) => set_item_qoh(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item Description</label>
          <input placeholder='Item Description' onChange={(e) => set_item_description(e.target.value)}/>
        </Form.Field>
        <Button onClick={postData} type='submit'>Submit</Button>
      </Form>
    </div>
    :
    <h2>You are not an admin!</h2>
  )
}

export default CreateItem;