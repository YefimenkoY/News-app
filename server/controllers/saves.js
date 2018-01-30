const fs = require('fs');
const path = require('path');
const Save = require('../models/saves');

const getSaves = async (req, res) => {
  try {
    const data = await Save.find({});
    res.send(data);
  } catch (e) {
    res.end(400, e.message)
  }
};

const saveBook = async (req, res) => {
  try {
    const saves = await Save.create(req.body);
    res.json(await Save.find({}));
  } catch (e) {
    res.end(400, e.message)
  }
};

const deleteBook = async (req, res) => {
  const id = req.param('id');
  try {
    await Save.remove({ id });
    const saves = await Save.find({});
    res.json(saves);
  } catch (e) {
    res.end(400, e.message)
  }
}

module.exports = {
  getSaves,
  saveBook,
  deleteBook,
};
