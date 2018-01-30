const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const api = require('./routes/saves');
const { mongoose: { url } } = require('./config.json');

const app = express();
const _PORT_ = process.env.PORT || 8060;
const _STATIC_FOLDER_ = path.resolve(__dirname, '../build');


db.on('error', (err) => {
  throw Error('failed connet to mongo: ' + err);
});

db.on('open', () => {
  app.set('port', _PORT_);
  app.use(express.static(_STATIC_FOLDER_));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/v1/', api);

  app.get('/', (req, res) => {
    res.sendFile(path.join(_STATIC_FOLDER_, '/index.html'));
  });

  app.get('/**', (req, res) => {
    res.sendFile(path.join(_STATIC_FOLDER_, '/index.html'));
  });

  app.listen(_PORT_, () => {
    console.log(`Listening on port ${_PORT_}`);
  });
});
