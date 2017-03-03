import React from 'react';
import {Router,Route,IndexRoute} from '../utils/router_helper';

// component
import App from './components/app';
import LoginPage from './components/loginpage';

export const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={LoginPage}/>
    </Route>
  </div>
);

export default function({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}
