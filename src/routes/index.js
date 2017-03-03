import React, { PropTypes } from 'react';
import {Router,Route} from '../utils/router_helper';

// component
import App from './components/app';
import LoginPage from './components/loginpage';

const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: App,
      indexRoute: {
        component: LoginPage
      },
      childRoutes: [
        require('./mainroutes')
      ]
    }
  ]
}

export default function({ history }){
  return <Router history={history} routes={rootRoute}/>
}
