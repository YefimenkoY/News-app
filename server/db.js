const mongoose = require('mongoose');
const { mongoose: { uri, options } } = require('./config.json');

mongoose.connect(uri, options, (err) => {
  if (err) console.log(err)
  mongoose.Promise = global.Promise;
  console.log('mongoose was connected...')
});

module.exports = mongoose.connection;
