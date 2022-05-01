/* ----------------------------------------------------------------------------------
    -Team Number: Team 16
    -Project: Grocery Store Database and UI
    -Page was coded by: Sunhee Kim
    -Purpose of this Page: 
        A database entity order instance can be created by a customer and added  
        to the database at checkout.  This script will allow an admin to view
       all instances of customer orders that have been logged in the database

--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table } from 'semantic-ui-react'

import Nav from './nav';

/*Function ReadOrder - will reference the api for a getorders 
through sql commands through the getData function to retrieve all the values in
 the entity orders */
function ReadOrder() {
  const user_id = localStorage.getItem('user_id');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
 
/*sets local stoarage variables (accessed later) to a set of passed in arguments 
  - all the order entity attributes used for later display*/
//   const setData = (data) => {
//     let { order_id , user_id, order_datetime } = data;
//     localStorage.setItem('order_id', order_id);
//     localStorage.setItem('user_id', user_id);
//     localStorage.setItem('order_datetime', order_datetime);
// }

/*Function getData - will reference the api for a getorders through sql 
  commands. The order ID, user id, and order datetime for all 
  existing values in the entity orders will be displayed as outputs for 
  the user to view*/
  const getData = () => {
    axios.put('/api/get/getorders', {
      user_id
    }).then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  /*Function onDelete - will reference the api for a deleteorder through sql 
commands and interface with the user. The order ID (primary key) will be taken 
from user input and then deleted*/
  // const onDelete = (order_id) => {
  //   axios.put('/api/delete/deleteorder', {
  //       order_id
  //   }).then(() => {
  //     getData();
  //   })
  // }

  /*returns the js code for displaying the inputs and processing the data to view all
    established order entity instances. Also has buttons linked to updating 
    and deleting a specified order instance*/
  return (
    <div>
      <Nav></Nav>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>User ID</Table.HeaderCell>
            <Table.HeaderCell>Order Datetime</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.order_id}</Table.Cell>
                <Table.Cell>{data.user_id}</Table.Cell>
                <Table.Cell>{data.order_datetime}</Table.Cell>
                {/* <Link to='/schedulepickup'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link> */}
                {/* <Table.Cell>
                  <Button onClick={() => onDelete(data.order_id)}>Delete</Button>
                </Table.Cell> */}
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ReadOrder;