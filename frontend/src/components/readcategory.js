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
import { useHistory } from 'react-router';

import Nav from './nav';

function ReadCategory() {
  let history = useHistory();
  const user_is_admin = localStorage.getItem('user_is_admin');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const setData = (data) => {
    let { category_id , category_name } = data;
    localStorage.setItem('category_id', category_id);
    localStorage.setItem('category_name', category_name);
  }

  const getData = () => {
    axios.get('/api/get/getcategories')
    .then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  const onDelete = (category_id) => {
    axios.put('/api/delete/deletecategory', {
      category_id
    }).then(() => {
      getData();
    })
  }

  return (
    user_is_admin === 'true' ?
    <div>
      <Nav></Nav>
      <Button onClick={() => history.push('/createcategory')}>Create Category</Button>
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
                <Link to='/updatecategory'>
                  <Table.Cell> 
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.category_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
    :
    <div>
      <Nav></Nav>
      <h2>You are not an admin!</h2>
    </div>
  )
}

export default ReadCategory;