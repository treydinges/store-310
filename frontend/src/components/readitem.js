import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function ReadItem() {
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const setData = (data) => {
    let { item_id , category_id, item_name, item_price, item_qoh, item_description } = data;
    localStorage.setItem('item_id', item_id);
    localStorage.setItem('category_id', category_id);
    localStorage.setItem('item_name', item_name);
    localStorage.setItem('item_price', item_price);
    localStorage.setItem('item_qoh', item_qoh);
    localStorage.setItem('item_description', item_description);
  }

  const getData = () => {
    axios.get('/api/get/getitems')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  const onDelete = (item_id) => {
    axios.put('/api/delete/deleteitem', {
      item_id
    }).then(() => {
      getData();
    })
  }

  return (
   
    <div>
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
                <Link to='/updateitem'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.item_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
   
  )
}

export default ReadItem;