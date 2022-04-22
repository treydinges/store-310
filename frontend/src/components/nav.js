import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function Nav() {
  let history = useHistory();
  const user_id = localStorage.getItem('user_id');
  const user_is_admin = localStorage.getItem('user_is_admin');

  function AccountButtons() {
    if (user_id === 'null') {
      return (
        <span>
          <Button onClick={() => history.push('/login')}>Login</Button>
          <Button onClick={() => history.push('/createuser')}>Sign Up</Button>
        </span>
      );
    } else {
      return (
        <span>
          <Button onClick={() => history.push('/shoppingcart')}>Shopping Cart</Button>
          <Button onClick={() => signOut()}>Sign Out</Button>
          <Button onClick={() => history.push('/readfavorite')}>Favorites</Button>
          <Button onClick={() => history.push('/readorder')}>Previous Orders</Button>
        </span>
      );
    }
  }

  function AdminButtons() {
    if (user_is_admin === 'true') {
      return (
        <span>
          <Button onClick={() => history.push('/readcategory')}>Categories</Button>
          <Button onClick={() => history.push('/readitem')}>Items</Button>
          <Button onClick={() => history.push('/readpickuplocation')}>Pickup Locations</Button>
        </span>
      );
    } else {
      return (<span></span>);
    }
  }

  const signOut = () => {
    localStorage.clear();
    localStorage.setItem('user_id', 'null');
    localStorage.setItem('user_is_admin', 'false');
    history.push('/')
  }

  return (
    <div>
      <Button onClick={() => history.push('/')}>Home</Button>

      <AccountButtons></AccountButtons>

      <AdminButtons></AdminButtons>
    </div>
  )
}

export default Nav;