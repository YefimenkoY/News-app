const mongoose = require('mongoose');
const config = require('./config.json');
console.log(config.mongoose.uri)
mongoose.connect(config.mongoose.uri, config.mongoose.options, (err) => {
  if (err) throw Error(err)
  mongoose.Promise = global.Promise;
  console.log('mongoose was connected...');
});

module.exports = mongoose.connection;
