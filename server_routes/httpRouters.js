// import UserControll from '../controlls/userControll';
// import {test_logic} from '../server_logic/test_logic';

export default function httpRouterHandle(app) {

  // 所有的get操作都指向到index.html页面
  app.get('*', function(req, res, next) {
    res.sendfile('./views/index.html');
  });
}
