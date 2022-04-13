import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


function ReadPickups() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const setData = (data) => {
    let { pickup_id, order_id, pickup_location_id, pickup_start_time, pickup_end_time, pickup_fk1, pickup_fk2 } = data;
    localStorage.setItem('pickup_id', pickup_id);
    localStorage.setItem('order_id', order_id);
    localStorage.setItem('pickup_location_id', pickup_location_id);
    localStorage.setItem('pickup_start_time', pickup_start_time);
    localStorage.setItem('pickup_end_time', pickup_end_time);
    localStorage.setItem('pickup_fk1', pickup_fk1);
    localStorage.setItem('pickup_fk2', pickup_fk2);
  }

  const getData = () => {
    axios.get('/api/get/getpickups')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  const onDelete = (pickup_id) => {
    axios.put('/api/delete/deletepickups', {
      pickup_id
    }).then(() => {
      getData();
    })
  }

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Pickup ID</Table.HeaderCell>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Pickup Location ID</Table.HeaderCell>
            <Table.HeaderCell>Pickup Start Time</Table.HeaderCell>
            <Table.HeaderCell>Pickup End Time</Table.HeaderCell>
            <Table.HeaderCell>Pickup fk 1</Table.HeaderCell>
            <Table.HeaderCell>Pickup fk 2</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.pickup_id}</Table.Cell>
                <Table.Cell>{data.order_id}</Table.Cell>
                <Table.Cell>{data.pickup_location_id}</Table.Cell>
                <Table.Cell>{data.pickup_start_time}</Table.Cell>
                <Table.Cell>{data.pickup_end_time}</Table.Cell>
                <Table.Cell>{data.pickup_fk1}</Table.Cell>
                <Table.Cell>{data.pickup_fk2}</Table.Cell>
                <Link to='/updatepickups'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.pickup_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ReadPickups;
