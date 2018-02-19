const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saveSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  etag: String,
  selfLink: String,
  volumeInfo: {
    publishedDate: String,
    title: String,
    authors: [String],
    pageCount: Number,
    publisher: String,
    previewLink: String,
    infoLink: String,
    imageLinks: { smallThumbnail: String, thumbnail: String },
  },
});

module.exports = mongoose.model('Save', saveSchema);
