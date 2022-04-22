import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Nav from './nav';

function ReadOrder() {
  const user_id = localStorage.getItem('user_id');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const setData = (data) => {
    let { order_id , user_id, order_datetime } = data;
    localStorage.setItem('order_id', order_id);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('order_datetime', order_datetime);
}

  const getData = () => {
    axios.put('/api/get/getorders', {
      user_id
    }).then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  const onDelete = (order_id) => {
    axios.put('/api/delete/deleteorder', {
        order_id
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