const mongoose = require('mongoose');
const { mongoose: { url } } = require('../config.json');

mongoose.connect(url, { useMongoClient: true }, (err) => {
  if (err) console.log(err)
  mongoose.Promise = global.Promise;
  console.log('mongoose was connected...')
});

module.exports = mongoose;
