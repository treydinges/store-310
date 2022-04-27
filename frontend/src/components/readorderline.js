/* ----------------------------------------------------------------------------------
    -Team Number: Team 16
    -Project: Grocery Store Database and UI
    -Page was coded by: Sunhee Kim
    -Purpose of this Page: 
        The entity orders is tied to a items through the bridge 
        entity called orderline. This script will allow the user to view
        all the combinations of customer orders and items in the database
        entity called orderline.

        This was mainly used for testing purposes to ensure the orderline entity of
        the database was setup correctly and functional in all commands.

--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Nav from './nav';
/*Function ReadOrderline - will reference the api for a getorderlines through sql 
commands through the getData function to retrieve all the values in the entity orderlines */
function ReadOrderline() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
 /*sets local stoarage variables (accessed later) to a set of passed in arguments - all the orderline entity 
  attributes used for later display*/
  const setData = (data) => {
    let { orderline_id, item_id, order_id, item_quantity } = data;
    localStorage.setItem('orderline_id', orderline_id);
    localStorage.setItem('item_id', item_id);
    localStorage.setItem('order_id', order_id);
    localStorage.setItem('item_quantity', item_quantity);
   
  }
 /*Function getData - will reference the api for a getorderlines through sql 
  commands. The orderline ID, item ID, order ID, and item quantity
  for all existing values in the entity orderlines will 
  be displayed as outputs for the user to view */
  const getData = () => {
    axios.get('/api/get/getorderlines')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }
  
  /*Function onDelete - will reference the api for a deleteorderline through sql 
commands and interface with the user. The orderline ID (primary key) will be taken 
from user input and then deleted*/
  const onDelete = (orderline_id) => {
    axios.put('/api/delete/deleteorderline', {
        orderline_id
    }).then(() => {
      getData();
    })
  }
  
  /*returns the js code for displaying the inputs and processing the data to view all
    established order and itme relationships. Also has buttons linked to updating 
    and deleting a specified orderline instance*/
  return (
    <div>
      <Nav></Nav>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Orderline ID</Table.HeaderCell>
            <Table.HeaderCell>Item ID</Table.HeaderCell>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Item Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.orderline_id}</Table.Cell>
                <Table.Cell>{data.item_id}</Table.Cell>
                <Table.Cell>{data.order_id}</Table.Cell>
                <Table.Cell>{data.item_quantity}</Table.Cell>
                <Link to='/updateorderlines'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.orderline_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ReadOrderline;
