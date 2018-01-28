const express = require('express');
const { getSaves, deleteBook, saveBook } = require('../controllers/saves');

const Router = express.Router;
const api = new Router();

api.route('/saves')
  .get(getSaves)
  .post(saveBook)
  .delete(deleteBook);

module.exports = api;
