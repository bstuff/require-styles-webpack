const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' :
  'development';
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "3000";


module.exports = {
  entry: {
    frontend: './frontend/index.js',
  },
  output: {
    path: path.join(__dirname, 'www'),
    // chrome sourceMap fix
    publicPath: NODE_ENV !== 'production' ? `http://localhost:${PORT}/` : '',
    filename: 'build/[name].js?[hash]',
  },
  resolve: {
    modules: [
      './node_modules/',
    ],
    extensions: [ '*', '.jsx', '.js', '.css' ],
  },

  resolveLoader: {
    modules: ['./node_modules/'],
    moduleExtensions: [ '-loader', '*' ],
    extensions: [ '*', '.js' ],
  },

  devServer: {
    watchOptions: {
      aggregateTimeout: 100,
      poll: 1000
    },
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    noInfo: true,
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: [path.join(__dirname, 'frontend')],
      exclude: [/\/(node_modules|bower_components)\//],
      loader: 'babel-loader',
    }, {
      test: /\.html$/,
      loader: 'html?attrs=img:src xlink:href source:src image:xlink:href&interpolate',
    }, {
      test: /\.styl$/,
      loaders: ExtractTextPlugin.extract({ fallback:'style', use:[
        'css-loader',
        'stylus-loader',
      ], publicPath:'../' }),
    }],

    noParse: [
      /\.min\.js/,
      /jquery.js/,
      /angular.js/,
    ],
  },

  // devtool: NODE_ENV === 'production' ? false : 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'WFF',
      template: 'frontend/index.html',
      filename: 'index.html',
      chunks: ['frontend'],
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ]
};

if (NODE_ENV === 'production') {
  module.exports.plugins = module.exports.plugins.concat([

    new ProgressBarPlugin(),

  ]);

} else {
  module.exports.plugins = module.exports.plugins.concat([
    new WebpackErrorNotificationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:3000/' }),
  ]);
}
