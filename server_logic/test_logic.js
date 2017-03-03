// import {match, RoutingContext, browserHistory} from '../src/utils/router_helper';
import { match, RoutingContext, createMemoryHistory } from 'dva/router';
import {routes} from '../src/routes/server_index';
import {renderToString} from 'react-dom/server';
import createApp from '../src/create_app';

let initialState={};
let app={};
let html;

export const test_logic = function(req, res, next){
  match({
    routes,
    location: req.url
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      switch (renderProps.location.pathname) {
        case '/':
        console.log('/test');
        initialState = {
          AuthModel: {
            // 权限代码
            authority: [
              '5001',
              '5000',
              '5003',
              '5004',
              '5005',
              '5006',
              '5007',
              '5008',
              '5009',
              '6001'
            ],
            // 授权代码
            authorize: [
              '001',
              '002',
              '003',
              '004',
              '005',
              '006',
              '1123',
              '3212',
              '0001'
            ]
          }
        };
        app = createApp({history: createMemoryHistory(),initialState},true);
        console.log('222',renderProps);
        html = renderToString(app.start()({renderProps}));
        res.end(renderFullPage(html, initialState));
        case '/main/0/30000101':
          initialState = {
            AuthModel: {
              // 权限代码
              authority: [
                '5001',
                '5000',
                '5003',
                '5004',
                '5005',
                '5006',
                '5007',
                '5008',
                '5009',
                '6001'
              ],
              // 授权代码
              authorize: [
                '001',
                '002',
                '003',
                '004',
                '005',
                '006',
                '1123',
                '3212',
                '0001'
              ]
            }
          };
          app = createApp({
            history: createMemoryHistory(),
            initialState
          },
          /* isServer */
          true);
          html = renderToString(app.start()({renderProps}));
          res.end(renderFullPage(html, initialState));
          break;
        default:
          res.status(500).end(`Uncaught pathname: ${renderProps.location.pathname}`);
          break;
      }
    } else {
      res.status(404).send('Not found')
    }
  });
}

function renderFullPage(html, initialState) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="/static/index.css" />
</head>
<body>
  <div id="root">
    <div>
      ${html}
    </div>
  </div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
  </script>
  <script src="/static/index.js"></script>
</body>
</html>
  `;
}
