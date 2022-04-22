import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'

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
    // get the cart for the current user (if there is one)
    axios.put('/api/get/getcart', {
      user_id
    }).then((response) => {
      let order_id = 'null';
      if (response.data[0]) {
        // user already has an uncompleted order
        order_id = response.data[0].order_id;

        // add or increment an orderline for the item
        let orderline_id = 'null';
        axios.put('/api/get/getorderline', {
          order_id,
          item_id
        }).then((response1) => {
          if (response1.data[0]) {
            orderline_id = response1.data[0].orderline_id;
            axios.put('/api/put/incrementorderline', {
              orderline_id,
              item_id
            }).then(() => {
              console.log("incremented item_quantity");
            }).catch((err) => console.log(err))
          } else {
            axios.post('/api/post/createorderline', {
              item_id,
              order_id
            }).then(() => {
              console.log("added to cart");
            }).catch((err) => console.log(err))
          }
        }).catch((err) => console.log(err))

      } else {
        // create cart for the user
        axios.post('/api/post/createorder', {
          user_id
        }).then(() => {
          axios.put('/api/get/getcart', {
            user_id
          }).then((response1) => {
            order_id = response1.data[0].order_id;
            // create an orderline for the item
            axios.post('/api/post/createorderline', {
              item_id,
              order_id
            }).then(() => {
              console.log("added to cart");
            }).catch((err) => console.log(err))
          }).catch((err) => console.log(err))
        }).catch((err) => console.log(err))
      }
    }).catch((err) => console.log(err))

    // // subtract from the item qoh
    // axios.put('/api/put/decrementitem', {
    //   item_id
    // }).then(() => {
    //   console.log("decremented item_qoh");
    // }).catch((err) => console.log(err))
  }

  const addToFavorites = (item_id) => {
    // check if the item is already in the users favorites
    // if it is, do nothing, otherwise add it to the favorties
    axios.put('/api/get/getfavorite', {
      user_id,
      item_id
    }).then((response) => {
      if (response.data[0]) {
        console.log("already in favorites")
      } else {
        axios.post('/api/post/createfavorite', {
          user_id,
          item_id,
        }).then(() => {
          console.log("added to favorites");
        }).catch((err) => console.log(err))
      }
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