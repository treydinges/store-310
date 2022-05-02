/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Charles Dinges
  -Purpose of this Page:
    Shows all of the items available to buy in the store. Shows item details as well
    as links to add the items to the shopping cart or list of favorites. This page
    is only shown to users who log in to their accounts.
--------------------------------------------------------------------------------*/

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

  // API call to get all of the item data in the store
  const getData = () => {
    axios.get('/api/get/getitems')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  // adds the given item to the user's cart
  // first there is an API call to get the current user's cart
  // if there user does not have a cart, a cart is created in the database, and then the id of that cart is set locally
  // if the user alread has a cart, we set the id of that cart so we can add the item
  //
  // if the item is already in the cart, the item quantity in the orderline is incremented
  // if the item is not in the cart the orderline is created for the given cart id and item
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
  }

  // adds the item to the user's favorites
  // to avoid duplicates, there is first an API call to see if the item is already in the favorites
  // if it is not already there, we create an entry in the database for the user and item combo
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

  // conditionally render items available to buy with links to add to cart and add to favorites
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