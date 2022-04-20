import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function ReadPickupLocation() {
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const setData = (data) => {
    let { pickup_location_id, pickup_location_parking_spot } = data;
    localStorage.setItem('pickup_location_id', pickup_location_id);
    localStorage.setItem('pickup_location_parking_spot', pickup_location_parking_spot);
   
  }

  const getData = () => {
    axios.get('/api/get/getpickuplocations')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  const onDelete = (pickup_location_id) => {
    axios.put('/api/delete/deletepickuplocation', {
        pickup_location_id
    }).then(() => {
      getData();
    })
  }

  return (
    user_is_admin === 'true' ?
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
                <Link to='/updatepickuplocation'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.pickup_location_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
    :
    <h2>You are not an admin!</h2>
  )
}

export default ReadPickupLocation;
