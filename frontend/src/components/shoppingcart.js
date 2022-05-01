/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: 
  -Purpose of this Page: 
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router';

import Nav from './nav';

function ShoppingCart() {
  let history = useHistory();
  const user_id = localStorage.getItem('user_id');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const increment = (orderline_id) => {
    axios.put('/api/put/incrementorderline', {
      orderline_id
    }).then(() => {
      getData();
    })
  }

  const decrement = (orderline_id) => {
    axios.put('/api/put/decrementorderline', {
      orderline_id
    }).then(() => {
      getData();
    })
  }

  const onDelete = (orderline_id) => {
    axios.put('/api/delete/deleteorderline', {
      orderline_id
    }).then(() => {
      getData();
    })
  }

  const onCheckout = () => {
    axios.put('/api/get/getcart', {
      user_id
    }).then((response) => {
      if (response.data[0]) {
        let order_id = response.data[0].order_id;
        localStorage.setItem('order_id', order_id);
        axios.put('/api/put/updateorder', {
          user_id,
          order_id
        }).then(() => {
          // update qoh of each item in the order lines
          axios.put('/api/get/getorderlinequantites', {
            order_id
          }).then((response) => {
            response.data.forEach(element => {
              let item_id = element.item_id;
              let item_quantity = element.item_quantity;
              axios.put('/api/put/updateitemqoh', {
                item_id,
                item_quantity
              }).then(() => {
              })
            });
            history.push('/createpickup')
          })
        })
      }
    }).catch((err) => console.log(err))
  }

  const getData = () => {
    axios.put('/api/get/getcart', {
      user_id
    }).then((response) => {
      if (response.data[0]) {
        let order_id = response.data[0].order_id;

        axios.put('/api/get/getorderlines', {
          order_id
        }).then((response) => {
          setAPIData(response.data);
        }).catch((err) => console.log(err))
      }
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <Nav></Nav>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Item Price</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.item_name}</Table.Cell>
                <Table.Cell>{data.item_price}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => decrement(data.orderline_id)}>-</Button>
                </Table.Cell>
                <Table.Cell>{data.item_quantity > 0 ? data.item_quantity : 0}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => increment(data.orderline_id)}>+</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.orderline_id)}>Remove</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
        <div>
            <Button onClick={() => onCheckout()}>Checkout</Button>
        </div>
      </Table>

    </div>
  )
}

export default ShoppingCart;
