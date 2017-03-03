const webpack = require('atool-build/lib/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
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

  webpackConfig.output.path = resolveApp('build');

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push('dva-hmr');
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  // 按需加载antd组件
  webpackConfig.babel.plugins.push([
    'import', {
      libraryName: 'antd',
      style: 'css'
    }
  ]);

  if (env != 'development') {

    // 引用dll包
    webpackConfig.plugins.push(new webpack.DllReferencePlugin({context: __dirname, manifest: require('./lib.json')}));
    webpackConfig.plugins.push(new webpack.DllReferencePlugin({context: __dirname, manifest: require('./components-lib.json')}));

    // 生成入口html文件
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: resolveApp('temphtml.html'),
      filename: resolveApp('views/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }));

    // 启动压缩脚本插件
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

    // 声明注释头信息
    webpackConfig.plugins.push(new webpack.BannerPlugin("Copyright ."));

    // 重置编译目录
    webpackConfig.output.filename = `script/${webpackConfig.output.filename}`;
    webpackConfig.output.chunkFilename = `script/${webpackConfig.output.chunkFilename}`;
    webpackConfig.plugins[0].filenameTemplate = `script/${webpackConfig.plugins[0].filenameTemplate}`;
    webpackConfig.plugins[1].filename = `css/${webpackConfig.plugins[1].filename}`;

  }



  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function(loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader = new ExtractTextWebpackPlugin.extract("css-loader", "postcss-loader", "less-loader");
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader = new ExtractTextWebpackPlugin.extract("css-loader", "postcss-loader", "less-loader");
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader = new ExtractTextWebpackPlugin.extract("style-loader", "css-loader", "postcss-loader");
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader = new ExtractTextWebpackPlugin.extract("style-loader", "css-loader", "postcss-loader");
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });

  webpackConfig.module.loaders[webpackConfig.module.loaders.length - 1] = {
    test: /\.html$/,
    loader: 'html',
    query: {
      attrs: []
      // attrs: ['link:href']
    }
  };
  return webpackConfig;
};
