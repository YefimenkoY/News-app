const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saveShema = new Schema({
  id: String,
  etag: String,
  selfLink: String,
  volumeInfo: {
    title: String,
    authors: [String],
    publisher: String,
    imageLinks: { smallThumbnail: String, thumbnail: String },
  },
});

module.exports = mongoose.model('Save', saveShema);

