/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: 
  -Purpose of this Page: 
--------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Nav from './nav';

function Checkout() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get('/api/get/getpickuplocations')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <Nav></Nav>
      <Table singleLine>
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Pickup Location ID</Table.HeaderCell>
          <Table.HeaderCell>Pickup Location Parking Spot</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.pickup_location_id}</Table.Cell>
                <Table.Cell>{data.pickup_location_parking_spot}</Table.Cell>
                <Link to='/updatecategory'>
                <Table.Cell> 
                  <Button onClick={() => getData()}>GetData</Button>
                </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button> Checkout </Button>
                </Table.Cell>
              </Table.Row>
            )})}
        </Table.Body>
    </Table>
    </div>
  )
}

export default Checkout;