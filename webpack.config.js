'use strict';

const path = require('path');
const webpack = require('webpack');
const utils = require('./webpack/utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const LOCAL_ENV = 'local';
const DEV_ENV = 'development';
const PROD_ENV = 'production';

const BUILD_FOLDER = './src';
const PUBLIC_FOLDER = './build';

const NODE_ENV = process.env.NODE_ENV || DEV_ENV;
const APP_FOLDER = process.cwd();
const BUILD_FILE = './index.js';
const TEMPLATE_FILE = './index.html';

const config = {
  entry: path.join(APP_FOLDER, BUILD_FOLDER, BUILD_FILE),
  output: {
    path: path.join(APP_FOLDER, PUBLIC_FOLDER),
    filename: 'bundle.js'
  },
  externals: {
    'react': 'React',
    'redux': 'Redux',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'config': JSON.stringify(require('./build-config'))
  },
  watch: NODE_ENV === LOCAL_ENV,
  devtool: NODE_ENV === DEV_ENV ? 'source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      DEV_ENV: JSON.stringify(DEV_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(APP_FOLDER, BUILD_FOLDER, TEMPLATE_FILE),
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader?modules', 'sass-loader?modules']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(html)$/,
        use: { loader: 'html-loader' }
      }
    ]
  },
  devServer: {
    contentBase: './build', host: '0.0.0.0',
    proxy: {
      '/api/saves': {
        target: 'http://localhost:8060'
      }
    }
  }
};

if (NODE_ENV === PROD_ENV) {
  config.plugins.push(utils.Uglify());
  config.plugins.push(utils.GZip());
}

module.exports = config;

