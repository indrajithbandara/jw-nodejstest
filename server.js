import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fs from 'fs';
import FileStreamRotator from 'file-stream-rotator';
import uuid from 'node-uuid';
// http路由配置
import routerHandle from './server_routes/httpRouters';

const cookieSecret = "zhaoxiang";
const app = express();
const port = 3000;

// =日志=============================
// 日志目录
var logDirectory = __dirname + '/log'
// 判断是否存在目录，如果不存在则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: true
})
logger.token('id', function getId(req) {
  return req.id
})
// 创建日志
app.use(logger(':id :method :url :status :response-time :remote-addr :user-agent ', {stream: accessLogStream}))

// =设置视图目录==============================
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'html');

// =应用中间件===============================
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(cookieSecret));
app.use(express.static(path.join(__dirname, 'build')));
// app.use(favicon(path.join(__dirname, '/build', 'favicon.ico')));

// =设置路由============================================
routerHandle(app);

// =错误请求===================================================
// 处理404请求
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 处理500请求

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log('err',err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log('err2',err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 生成请求编号
function assignId(req, res, next) {
  req.id = uuid.v4()
  next()
}

app.listen(port);
