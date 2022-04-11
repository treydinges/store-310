import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function CreateCategory() {
    let history = useHistory();
    const [category_name, setName] = useState('');
    const postData = () => {
        axios.post('/api/post/createcategory', {
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
                    <input placeholder='Category Name' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default CreateCategory;