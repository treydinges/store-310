import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Nav from './nav';
import { useHistory } from 'react-router';

function ViewPickupLocation() {
  let history = useHistory();
  const user_is_admin = localStorage.getItem('user_is_admin');
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
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Pickup Location ID</Table.HeaderCell>
            <Table.HeaderCell>Parking Spot</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.pickup_location_id}</Table.Cell>
                <Table.Cell>{data.pickup_location_parking_spot}</Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ViewPickupLocation;
