const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const apiServerConfig = require('../server/config.json');

const LOCAL_ENV = 'local';
const DEV_ENV = 'development';
const PROD_ENV = 'production';
const DEV_PORT = 8093;
const BUILD_FOLDER = '../src/index.js';
const NODE_ENV = process.env.NODE_ENV || DEV_ENV;
const APP_FOLDER = __dirname;

const webpackConfig = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.resolve(APP_FOLDER, BUILD_FOLDER),
  ],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: "/",
  },
  watch: NODE_ENV === LOCAL_ENV,
  devtool: NODE_ENV === DEV_ENV ? 'source-map' : false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      DEV_ENV: JSON.stringify(DEV_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(APP_FOLDER, '../src/index.html'),
      inject: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
          {
            loader: 'url-loader',
            options: { limit: 40000 },
          },
        ],
      },
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
    port: DEV_PORT,
    contentBase: path.resolve(__dirname, '../src/'),
    historyApiFallback: true,
    proxy: {
      [`http://localhost:${DEV_PORT}/api/v1/saves`]: {
        target: `http://localhost:${apiServerConfig.port}`,
      }
    }
  },
};

if (NODE_ENV === PROD_ENV) {
  webpackConfig.plugins.push(utils.Uglify());
  webpackConfig.plugins.push(utils.GZip());
}

module.exports = webpackConfig;
