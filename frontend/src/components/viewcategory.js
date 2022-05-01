import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table } from 'semantic-ui-react'

function ReadCategory() {
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get('/api/get/getcategories')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  return (
    user_is_admin === 'true' ?
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Category ID</Table.HeaderCell>
            <Table.HeaderCell>Category Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.category_id}</Table.Cell>
                <Table.Cell>{data.category_name}</Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
    :
    <div>
      <h2>You are not an admin!</h2>
    </div>
  )
}

export default ReadCategory;