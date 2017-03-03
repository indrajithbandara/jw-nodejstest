const webpack = require('atool-build/lib/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
var fs = require('fs');

// 获取项目根目录
var appDirectory = fs.realpathSync(process.cwd());
// 根据参数生成地址
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const liblist = [
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'react-router-redux',
    // 'redux-actions',
    'redux-saga',
    'whatwg-fetch',
    // 'dva',
    'keymaster',
    'keycode',
    'immutable',
    'lodash'
]

module.exports = function(webpackConfig, env) {
  webpackConfig.plugins.push(
  //清空发布目录
  new CleanWebpackPlugin([
    resolveApp('build')
  ], {
    root: resolveApp('/'), // An absolute path for the root  of webpack.config.js
    verbose: true, // Write logs to console.
    dry: false // Do not delete anything, good for testing.
  }));
  webpackConfig.babel.plugins.push('transform-runtime');
  // 按需加载antd组件
  webpackConfig.babel.plugins.push([
    'import', {
      libraryName: 'antd',
      style: 'css'
    }
  ]);

  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }));

  webpackConfig.output.path = resolveApp('build');
  webpackConfig.output.library='[name]';

  webpackConfig.entry={};
  webpackConfig.entry.lib=liblist;

  webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  webpackConfig.plugins.push(new webpack.DllPlugin({path: 'lib.json', name: '[name]', context: __dirname}));

  return webpackConfig;
};
