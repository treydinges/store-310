import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function UpdateCategory() {
  let history = useHistory();
  const [category_id, setID] = useState(null);
  const [category_name, setName] = useState('');

  useEffect(() => {
    setID(localStorage.getItem('category_id'));
    setName(localStorage.getItem('category_name'));
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
    <div>
      <Form>
        <Form.Field>
          <label>Category Name</label>
          <input placeholder={category_name} onChange={(e) => setName(e.target.value)}/>
        </Form.Field>
        <Button onClick={updateAPIData} type='submit'>Update</Button>
      </Form>
    </div>
  )
}

export default UpdateCategory;
