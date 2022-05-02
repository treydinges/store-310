/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Nathaniel Wang
  -Purpose of this Page: The purpose of this page is for wanting to view items
    by name, users are able to enter an item name into a search box that displays
    the items of that specific name.
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router';
import Nav from './nav';

function GetItemByName() {
  let history = useHistory();
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [item_name, set_item_name] = useState('');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
      getData();
    }, [])

  const getData = () => {
    axios.put('/api/get/getitembyname', {
      item_name,
    }).then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
      <br></br>
      <Form>
        <Form.Field>
          <label>Item Name</label>
          <input placeholder='Item Name' onChange={(e) => set_item_name(e.target.value)}/>
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

export default GetItemByName;