import React from 'react';
import dva from 'dva';
import {RouterContext} from 'dva/router';
import router from './routes';
import MessageListModel from './models/messagemodel/messagelistmodel';
import ResvListModel from './models/resvmodel/resvlistmodel';
import AuthModel from './models/system/authmodel';
import SystemFrame from './models/system/SystemFrame';

export default function createApp(opts, isServer) {

  // 1. Initialize
  const app = dva(opts);
  console.log('opts',opts);
  // 2. Plugins
  //app.use({});

  // 3. Model
  app.model(MessageListModel);
  app.model(ResvListModel);
  app.model(AuthModel);
  app.model(SystemFrame);


  // 4. Router
  if (isServer) {
    app.router(({history, renderProps}) => {
      return <RouterContext {...renderProps}/>;
    });
  } else {
    app.router(router);
  }
  return app;

}
