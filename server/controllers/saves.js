const fs = require('fs');
const path = require('path');
let saves = require('../../saves.json');
const Save = require('../models/saves');

const getSaves = (req, res) => {
  console.log('saves')
  Save.find({}, (err, data) => {
    console.log('sdf', err, data)
    res.send(saves);
  });
  // fs.readFile(path.resolve(__dirname, '../../saves.json'), 'utf8', (err, data) => {
  //   console.log(req.path)
  //   if (err) console.log(err);
  //   res.send(data);
  // })
};

const saveBook = async (req, res) => {
  const saves = await Save.create({title: 'test'});
  console.log(saves)
};

const deleteBook = (req, res) => {
  const id = req.param('id');

  saves = saves.filter(save => save.id !== id);

  fs.writeFile(path.resolve(__dirname, '../../saves.json'), JSON.stringify(saves), (err) => {
    if (err) return console.log(err);
    res.send(saves);
    console.log('The file was deleted!');
  });
}

module.exports = {
  getSaves,
  saveBook,
  deleteBook,
};
