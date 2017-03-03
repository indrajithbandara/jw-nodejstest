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

module.exports = function(webpackConfig, env) {
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
  webpackConfig.entry.componentslib=['./src/components/featurecoms/index.js'];

  webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  // 引用dll包
  webpackConfig.plugins.push(new webpack.DllReferencePlugin({context: __dirname, manifest: require('./lib.json')}));

  webpackConfig.plugins.push(new webpack.DllPlugin({path: 'components-lib.json', name: '[name]', context: __dirname}));

  return webpackConfig;
};
