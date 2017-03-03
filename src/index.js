// import 'babel-polyfill';


import { HistoryHandle } from './utils/router_helper';
import createApp from './create_app';

import 'bootstrap/dist/css/bootstrap.css';
import './index.less';

import './CONFIG.js';

const app = createApp({
  history: HistoryHandle,
  initialState: window.__INITIAL_STATE__
});
app.start('#root');
