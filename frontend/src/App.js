import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Checkout from './components/checkout';
import ShoppingCart from './components/shoppingcart';

import CreateUser from './components/createuser';
import UpdateUser from './components/updateuser';

import CreateCategory from './components/createcategory';
import UpdateCategory from './components/updatecategory';
import ReadCategory from './components/readcategory';


import CreateItem from './components/createitem';
import UpdateItem from './components/updateitem';
import ReadItem from './components/readitem';
import GetItemByName from './components/getitembyname';
import GetItemByCategory from './components/getitembycategory';

import ReadFavorite from './components/readfavorite';

import CreateOrder from './components/createorder';
import ReadOrder from './components/readorder';

import CreatePickupLocation from './components/createpickuplocation';
import UpdatePickupLocation from './components/updatepickuplocation';
import ReadPickupLocation from './components/readpickuplocation';

import CreatePickup from './components/createpickup';
import UpdatePickup from './components/updatepickup';
import ReadPickup from './components/readpickup';

import ReadUserPickups from './components/readuserpickups';


function App() {
  return (
    <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/shoppingcart' component={ShoppingCart} />

          <Route exact path='/createuser' component={CreateUser} />
          <Route exact path='/updateuser' component={UpdateUser} />

          <Route exact path='/createcategory' component={CreateCategory} />
          <Route exact path='/updatecategory' component={UpdateCategory} />
          <Route exact path='/readcategory' component={ReadCategory} />

          <Route exact path='/createitem' component={CreateItem} />
          <Route exact path='/updateitem' component={UpdateItem} />
          <Route exact path='/readitem' component={ReadItem} />
          <Route exact path='/getitembyname' component={GetItemByName} />
          <Route exact path='/getitembycategory' component={GetItemByCategory} />

          <Route exact path='/readfavorite' component={ReadFavorite} />

          <Route exact path='/createorder' component={CreateOrder} />
          <Route exact path='/readorder' component={ReadOrder} />

          <Route exact path='/createpickuplocation' component={CreatePickupLocation} />
          <Route exact path='/updatepickuplocation' component={UpdatePickupLocation} />
          <Route exact path='/readpickuplocation' component={ReadPickupLocation} />

          <Route exact path='/createpickup' component={CreatePickup} />
          <Route exact path='/updatepickup' component={UpdatePickup} />
          <Route exact path='/readpickup' component={ReadPickup} />

          <Route exact path='/readuserpickups' component={ReadUserPickups} />
        </div>
    </Router>
  );
}

export default App;