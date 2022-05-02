/* ----------------------------------------------------------------------------------
  -Team Number: Team 16
  -Project: Grocery Store Database and UI
  -Page was coded by: Charles Dinges
  -Purpose of this Page:
    Conditionally renders all of the links to other pages within the application,
    this nav bar handles access to the various pages as well handles signout of the
    currently signed in user. This is a separate component to allow for the best
    modularity while moving between pages.
--------------------------------------------------------------------------------*/

import React from 'react';

import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router';

function Nav() {
  let history = useHistory();
  // gets the user credentials, these are always set by default to null and false
  const user_id = localStorage.getItem('user_id');
  const user_is_admin = localStorage.getItem('user_is_admin');

  // conditionally renders all of the account management buttons
  // if the user is not logged in the "log in" and "sign up" buttons are shown
  // else the "sign out" and other user-specific links are shown
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
          <Button onClick={() => history.push('/updateuser')}>Update User Details</Button>
          <Button onClick={() => history.push('/readfavorite')}>Favorites</Button>
          <Button onClick={() => history.push('/readorder')}>Previous Orders</Button>
        </span>
      );
    }
  }

  // conditionally renders all of the admin feature buttons
  // these buttons are only shown if the currenly logged in user has admin permissions
  function AdminButtons() {
    if (user_is_admin === 'true') {
      return (
        <span>
          <Button onClick={() => history.push('/readcategory')}>Categories</Button>
          <Button onClick={() => history.push('/readitem')}>Items</Button>
          <Button onClick={() => history.push('/readpickuplocation')}>Pickup Locations</Button>
          <Button onClick={() => history.push('/readuserpickups')}>Read User Pickups</Button>
        </span>
      );
    } else {
      return (<span></span>);
    }
  }

  // handles the sign out of the logged in user
  // sets the items used for conditional rendering throughout the app back to the default values
  const signOut = () => {
    localStorage.clear();
    localStorage.setItem('user_id', 'null');
    localStorage.setItem('user_is_admin', 'false');
    history.push('/')
  }

  // renders each of the sub-components for the navbar as well as a link to the home page
  return (
    <div>
      <Button onClick={() => history.push('/')}>Home</Button>

      <AccountButtons></AccountButtons>

      <AdminButtons></AdminButtons>
    </div>
  )
}

export default Nav;