const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./routes/saves');
const config = require('./config.json');

const app = express();
const _PORT_ = process.env.PORT || 6351;
const _STATIC_FOLDER_ = path.resolve(__dirname, '../build');


mongoose.connect(config.mongoose.url, { useMongoClient: true }, (err) => {
  if (err) console.log(err)
  mongoose.Promise = global.Promise;
  console.log('mongoose was connected...');
});


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
