import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import Home from './components/home';
import Login from './components/login';
import Checkout from './components/checkout';

import CreateUser from './components/createuser';
import UpdateUser from './components/updateuser';
import ReadUser from './components/readuser';

import CreateCategory from './components/createcategory';
import UpdateCategory from './components/updatecategory';
import ReadCategory from './components/readcategory';

import CreateItem from './components/createitem';
import UpdateItem from './components/updateitem';
import ReadItem from './components/readitem';

import CreateFavorite from './components/createfavorite';
import ReadFavorite from './components/readfavorite';

import CreateOrderline from './components/createorderline';
import ReadOrderline from './components/readorderline';

import CreateOrder from './components/createorder';
import UpdateOrder from './components/updateorder';
import ReadOrder from './components/readorder';

import CreatePickupLocation from './components/createpickuplocation';
import UpdatePickupLocation from './components/updatepickuplocation';
import ReadPickupLocation from './components/readpickuplocation';

import CreatePickup from './components/createpickup';
import UpdatePickup from './components/updatepickup';
import ReadPickup from './components/readpickup';


function App() {
  return (
    <Router>
      <div>
        <Link to='/'>
          <Button>Home</Button>
        </Link>
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
        <Link to='/checkout'>
          <Button>Checkout</Button>
        </Link>

        <Link to='/createuser'>
          <Button>Create User</Button>
        </Link>
        <Link to='/readuser'>
          <Button>View User</Button>
        </Link>

        <Link to='/createcategory'>
          <Button>Create Category</Button>
        </Link>
        <Link to='/readcategory'>
          <Button>View Category</Button>
        </Link>

        <Link to='/createitem'>
          <Button>Create Item</Button>
        </Link>
        <Link to='/readitem'>
          <Button>View Item</Button>
        </Link>

        <Link to='/createfavorite'>
          <Button>Create Favorite</Button>
        </Link>
        <Link to='/readfavorite'>
          <Button>View Favorite</Button>
        </Link>

        <Link to='/createorderline'>
          <Button>Create Order Line</Button>
        </Link>
        <Link to='/readorderline'>
          <Button>View Order Line</Button>
        </Link>

        <Link to='/createorder'>
          <Button>Create Order</Button>
        </Link>
        <Link to='/readorder'>
          <Button>View Order</Button>
        </Link>

        <Link to='/createpickuplocation'>
          <Button>Create Pickup Location</Button>
        </Link>
        <Link to='/readpickuplocation'>
          <Button>View Pickup Location</Button>
        </Link>

        <Link to='/createpickup'>
          <Button>Create Pickup</Button>
        </Link>
        <Link to='/readpickup'>
          <Button>View Pickup</Button>
        </Link>

        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/checkout' component={Checkout} />

          <Route exact path='/createuser' component={CreateUser} />
          <Route exact path='/updateuser' component={UpdateUser} />
          <Route exact path='/readuser' component={ReadUser} />

          <Route exact path='/createcategory' component={CreateCategory} />
          <Route exact path='/updatecategory' component={UpdateCategory} />
          <Route exact path='/readcategory' component={ReadCategory} />

          <Route exact path='/createitem' component={CreateItem} />
          <Route exact path='/updateitem' component={UpdateItem} />
          <Route exact path='/readitem' component={ReadItem} />

          <Route exact path='/createfavorite' component={CreateFavorite} />
          <Route exact path='/readfavorite' component={ReadFavorite} />

          <Route exact path='/createorderline' component={CreateOrderline} />
          <Route exact path='/readorderline' component={ReadOrderline} />

          <Route exact path='/createorder' component={CreateOrder} />
          <Route exact path='/updateorder' component={UpdateOrder} />
          <Route exact path='/readorder' component={ReadOrder} />

          <Route exact path='/createpickuplocation' component={CreatePickupLocation} />
          <Route exact path='/updatepickuplocation' component={UpdatePickupLocation} />
          <Route exact path='/readpickuplocation' component={ReadPickupLocation} />

          <Route exact path='/createpickup' component={CreatePickup} />
          <Route exact path='/updatepickup' component={UpdatePickup} />
          <Route exact path='/readpickup' component={ReadPickup} />
        </div>

      </div>
    </Router>
  );
}

export default App;