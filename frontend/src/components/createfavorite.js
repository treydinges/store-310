import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import ReadItem from './readitem';
import ReadUser from './readuser';

function CreateFavorite() {
  let history = useHistory();
  const [user_id, set_user_id] = useState(null);
  const [item_id, set_item_id] = useState(null);

  const postData = () => {
    axios.post('/api/post/createfavorite', {
      user_id,
      item_id,
    }).then(() => {
      history.push('/readfavorite');
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <ReadItem></ReadItem>
      <ReadUser></ReadUser>
      <br></br>
      <Form>
        <Form.Field>
          <label>User ID</label>
          <input placeholder='User ID' onChange={(e) => set_user_id(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Item ID</label>
          <input placeholder='Item ID' onChange={(e) => set_item_id(e.target.value)}/>
        </Form.Field>
        <Button onClick={postData} type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default CreateFavorite;