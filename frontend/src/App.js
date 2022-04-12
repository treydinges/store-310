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

        <Link to='/createuser'>
          <Button>Create User</Button>
        </Link>

        <Link to='/readuser'>
          <Button>View User</Button>
        </Link>

        <div>
          <Route exact path='/' component={Home} />

          <Route exact path='/createuser' component={CreateUser} />
          <Route exact path='/readuser' component={ReadUser} />
          <Route exact path='/updateuser' component={UpdateUser} />

          <Route exact path='/createcategory' component={CreateCategory} />
          <Route exact path='/readcategory' component={ReadCategory} />
          <Route exact path='/updatecategory' component={UpdateCategory} />
        </div>

      </div>
    </Router>
  );
}

export default App;