import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Nav from './nav';

function Home() {
  const user_id = localStorage.getItem('user_id');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get('/api/get/getitems')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  const addToCart = (item_id) => {
    
  }

  const addToFavorites = (item_id) => {
    axios.post('/api/post/createfavorite', {
      user_id,
      item_id,
    }).then(() => {
    }).catch((err) => console.log(err))
  }

  return (
    user_id !== 'null' ?
    <div>
      <Nav></Nav>
      <h2>Welcome Home!</h2>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Item Price</Table.HeaderCell>
            <Table.HeaderCell>Item Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.item_name}</Table.Cell>
                <Table.Cell>{data.item_price}</Table.Cell>
                <Table.Cell>{data.item_description}</Table.Cell>
                <Table.Cell> 
                  <Button onClick={() => addToCart(data.item_id)}>Add To Cart</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => addToFavorites(data.item_id)}>Add To Favorites</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
    :
    <div>
      <Nav></Nav>
      <h2>Please log in!</h2>
    </div>
  )
}

export default Home;