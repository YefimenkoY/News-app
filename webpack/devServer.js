const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const WDM = require('webpack-dev-middleware')
const WHM = require('webpack-hot-middleware')
const path = require('path');

const app = express();

const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const devConfig = webpackConfig.devServer;
const DEV_SERVER_PORT = process.env.PORT || devConfig.port;

app.use(express.static(path.resolve(__dirname, '../build')))
app.use(WDM(compiler, {}));
app.use(WHM(compiler, {
  log: console.log,
  path: "/__webpack_hmr",
}));

if (devConfig.proxy) {
  Object.keys(devConfig.proxy).forEach(function(context) {
    app.use(proxyMiddleware(context, devConfig.proxy[context]));
  });
}

if(devConfig.historyApiFallback) {
  console.log('404 responses will be forwarded to /index.html');
  
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(devConfig.contentBase, 'index.html'));
  });
}

app.get('/', (req,res) => {
  res.end(path.resolve(__dirname, '../build/index.html'))
})

app.listen(DEV_SERVER_PORT, () => {
  console.log(`Dev Server hosting on port: "${DEV_SERVER_PORT}"`);
});
