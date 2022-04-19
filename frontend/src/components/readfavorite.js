import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button } from 'semantic-ui-react';

function ReadFavorite() {
  const user_id = localStorage.getItem('user_id');
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const onDelete = (item_user_id) => {
    axios.put('/api/delete/deletefavorite', {
      item_user_id
    }).then(() => {
      getData();
    })
  }

  const getData = () => {
    axios.put('/api/get/getfavorites', {
      user_id
    }).then((response) => {
      setAPIData(response.data);
    }).catch((err) => console.log(err))
  }

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Item Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.item_name}</Table.Cell>
                <Table.Cell>{data.item_price}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.item_user_id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ReadFavorite;