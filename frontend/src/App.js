import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import Home from './components/home';
import CreateUser from './components/createuser';
import ReadUser from './components/readuser';
import UpdateUser from './components/updateuser';
import CreateCategory from './components/createcategory';
import ReadCategory from './components/readcategory';
import UpdateCategory from './components/updatecategory';
import Checkout from './components/checkout';
import CreatePickupLocation from './components/createpickuplocation';
import ReadPickupLocation from './components/readpickuplocation';
import ReadPickups from './components/readpickups';
import UpdatePickupLocation from './components/updatepickuplocation';
import UpdatePickups from './components/updatepickups';
import CreatePickups from './components/createpickups';
import CreateFavorite from './components/createfavorite';
import ReadFavorite from './components/readfavorite';

import CreateItem from './components/createitem';
import UpdateItem from './components/updateitem';
import ReadItem from './components/readitem';

import CreateOrderlines from './components/createorderlines';
import UpdateOrderlines from './components/updateorderlines';
import ReadOrderlines from './components/readorderlines';

import CreateOrders from './components/createorders';
import UpdateOrders from './components/updateorders';
import ReadOrders from './components/readorders';

function App() {
  return (
    <Router>
      <div>
        
        <Link to='/createcategory'>
          <Button>Create Category</Button>
        </Link>

        <Link to='/readcategory'>
          <Button>View Category</Button>
        </Link>

        <Link to='/createfavorite'>
          <Button>Create Favorite</Button>
        </Link>

        <Link to='/readfavorite'>
          <Button>View Favorite</Button>
        </Link>

        <Link to='/createuser'>
          <Button>Create User</Button>
        </Link>

        <Link to='/createpickuplocation'>
          <Button>Create Pickup Location</Button>
        </Link>

        <Link to='/readpickuplocation'>
          <Button>View Pickup Location</Button>
        </Link>

        <Link to='/readuser'>
          <Button>View User</Button>
        </Link>

        <Link to='/createitem'>
          <Button>Create Item</Button>
        </Link>

        <Link to='/readitem'>
          <Button>View Item</Button>
        </Link>


        <Link to='/checkout'>
          <Button>CheckoutPage</Button>
        </Link>

        

        <Link to='/createpickups'>
          <Button>Create Pickups</Button>
        </Link>
        <Link to='/readpickups'>
          <Button>View Pickups</Button>
        </Link>

        <Link to='/createorderlines'>
          <Button>Create Orderline</Button>
        </Link>
        <Link to='/readorderlines'>
          <Button>View Orderlines</Button>
        </Link>

        <Link to='/createorders'>
          <Button>Create Order</Button>
        </Link>
        <Link to='/readorders'>
          <Button>View Orders</Button>
        </Link>

      

        <div>
          <Route exact path='/' component={Home} />

          <Route exact path='/createuser' component={CreateUser} />
          <Route exact path='/readuser' component={ReadUser} />
          <Route exact path='/updateuser' component={UpdateUser} />
          <Route exact path='/createitem' component={CreateItem} />
          <Route exact path='/updateitem' component={UpdateItem} />
          <Route exact path='/readitem' component={ReadItem} />

          <Route exact path='/createcategory' component={CreateCategory} />
          <Route exact path='/readcategory' component={ReadCategory} />
          <Route exact path='/readpickuplocation' component={ReadPickupLocation} />
          <Route exact path='/updatecategory' component={UpdateCategory} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/createpickuplocation' component={CreatePickupLocation} />
          <Route exact path='/readpickups' component={ReadPickups} />
          <Route exact path='/updatepickuplocation' component={UpdatePickupLocation} />
          <Route exact path='/updatepickups' component={UpdatePickups} />
          <Route exact path='/createpickups' component={CreatePickups} />
          <Route exact path='/createfavorite' component={CreateFavorite} />
          <Route exact path='/readfavorite' component={ReadFavorite} />
          <Route exact path='/createorderlines' component={CreateOrderlines} />
          <Route exact path='/updateorderlines' component={UpdateOrderlines} />
          <Route exact path='/readorderlines' component={ReadOrderlines} />

          <Route exact path='/createorders' component={CreateOrders} />
          <Route exact path='/updateorders' component={UpdateOrders} />
          <Route exact path='/readorders' component={ReadOrders} />
          
        </div>

      </div>
    </Router>
  );
}

export default App;