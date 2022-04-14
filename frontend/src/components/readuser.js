import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function ReadUser() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const setData = (data) => {
    let { user_id, user_fname, user_lname, user_phone, user_password, user_is_admin } = data;
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('user_fname', user_fname);
    localStorage.setItem('user_lname', user_lname);
    localStorage.setItem('user_phone', user_phone);
    localStorage.setItem('user_password', user_password);
    localStorage.setItem('user_is_admin', user_is_admin);
  }

  const getData = () => {
    axios.get('/api/get/getusers')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  const onDelete = (user_id) => {
    axios.put('/api/delete/deleteuser', {
      user_id
    }).then(() => {
      getData();
    })
  }

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User ID</Table.HeaderCell>
            <Table.HeaderCell>User First Name</Table.HeaderCell>
            <Table.HeaderCell>User Last Name</Table.HeaderCell>
            <Table.HeaderCell>User Phone Number</Table.HeaderCell>
            <Table.HeaderCell>User Is Admin</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.user_id}</Table.Cell>
                <Table.Cell>{data.user_fname}</Table.Cell>
                <Table.Cell>{data.user_lname}</Table.Cell>
                <Table.Cell>{data.user_phone}</Table.Cell>
                <Table.Cell>{data.user_is_admin === 'true' ? 'Yes' : 'No'}</Table.Cell>
                <Link to='/updateuser'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.user_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ReadUser;
