import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import Home from './components/home';
import Login from './components/login';

import CreateUser from './components/createuser';
import UpdateUser from './components/updateuser';
import ReadUser from './components/readuser';

import CreateItem from './components/createitem';
import UpdateItem from './components/updateitem';
import ReadItem from './components/readitem';

import CreateCategory from './components/createcategory';
import UpdateCategory from './components/updatecategory';
import ReadCategory from './components/readcategory';

import CreateFavorite from './components/createfavorite';
import ReadFavorite from './components/readfavorite';

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

        <Link to='/createuser'>
          <Button>Create User</Button>
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

        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />

          <Route exact path='/createuser' component={CreateUser} />
          <Route exact path='/updateuser' component={UpdateUser} />
          <Route exact path='/readuser' component={ReadUser} />

          <Route exact path='/createitem' component={CreateItem} />
          <Route exact path='/updateitem' component={UpdateItem} />
          <Route exact path='/readitem' component={ReadItem} />

          <Route exact path='/createcategory' component={CreateCategory} />
          <Route exact path='/updatecategory' component={UpdateCategory} />
          <Route exact path='/readcategory' component={ReadCategory} />

          <Route exact path='/createfavorite' component={CreateFavorite} />
          <Route exact path='/readfavorite' component={ReadFavorite} />
        </div>

      </div>
    </Router>
  );
}

export default App;