/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Charles Dinges
  -Purpose of this Page:
    This page shows the favorites of the currently logged on user. This will simply
    show the item name and price as well as a button to remove items from the
    favorites list.
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react';

import Nav from './nav';

function ReadFavorite() {
  const user_id = localStorage.getItem('user_id');
  // container to store all of the necessary data
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  // API call to remove the given item from the user's favorites
  const onDelete = (item_user_id) => {
    axios.put('/api/delete/deletefavorite', {
      item_user_id
    }).then(() => {
      getData();
    })
  }

  // API call to get all of the user's favorites
  const getData = () => {
    axios.put('/api/get/getfavorites', {
      user_id
    }).then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  // render the table of the users favorites
  return (
    <div>
      <Nav></Nav>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Item Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.item_name}</Table.Cell>
                <Table.Cell>{data.item_price}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.item_user_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ReadFavorite;
