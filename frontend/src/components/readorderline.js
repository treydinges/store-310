import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Nav from './nav';

function ReadPickupLocation() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const setData = (data) => {
    let { orderline_id, item_id, order_id, item_quantity } = data;
    localStorage.setItem('orderline_id', orderline_id);
    localStorage.setItem('item_id', item_id);
    localStorage.setItem('order_id', order_id);
    localStorage.setItem('item_quantity', item_quantity);
   
  }

  const getData = () => {
    axios.get('/api/get/getorderlines')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  const onDelete = (orderline_id) => {
    axios.put('/api/delete/deleteorderline', {
        orderline_id
    }).then(() => {
      getData();
    })
  }

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

export default ReadPickupLocation;
