/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: 
  -Purpose of this Page: 
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router';
import ViewCategory from './viewcategory';
import Nav from './nav';

function GetItemByCategory() {
  let history = useHistory();
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [category_name, set_category_name] = useState('');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
      getData();
    }, [])

  const getData = () => {
    axios.put('/api/get/getitembycategory', {
      category_name,
    }).then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
      <ViewCategory></ViewCategory>
      <br></br>
      <Form>
        <Form.Field>
          <label>Item Name</label>
          <input placeholder='Category Name' onChange={(e) => set_category_name(e.target.value)}/>
        </Form.Field>
        <Button onClick={getData} type='submit'>Submit</Button>
      </Form>

            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Item ID</Table.HeaderCell>
                  <Table.HeaderCell>Category ID</Table.HeaderCell>
                  <Table.HeaderCell>Item Name</Table.HeaderCell>
                  <Table.HeaderCell>Item Price</Table.HeaderCell>
                  <Table.HeaderCell>Quantity on Hand</Table.HeaderCell>
                  <Table.HeaderCell>Item Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {APIData.map((data) => {
                  return (
                    <Table.Row>
                      <Table.Cell>{data.item_id}</Table.Cell>
                      <Table.Cell>{data.category_id}</Table.Cell>
                      <Table.Cell>{data.item_name}</Table.Cell>
                      <Table.Cell>{data.item_price}</Table.Cell>
                      <Table.Cell>{data.item_qoh}</Table.Cell>
                      <Table.Cell>{data.item_description}</Table.Cell>
                    </Table.Row>
                )})}
              </Table.Body>
            </Table>
    </div>
    :
    <h2>You are not an admin!</h2>
  )
}

export default GetItemByCategory;