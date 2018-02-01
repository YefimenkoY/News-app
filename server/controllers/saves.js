const Save = require('../models/saves');

const getSaves = async (req, res) => {
  let data;
  try {
    data = await Save.find({});
  } catch (e) {
    return res.status(500).end(e.message)
  }
  res.send(data);
};

const saveBook = async (req, res) => {
  try {
    await Save.create(req.body);
  } catch (e) {
    return res.status(400).end(e.message)
  }
  res.json(await Save.find({}));
};

const deleteBook = async (req, res) => {
  const id = req.param('id');
  let saves;
  if (!id)
    return res.status(400).end('id is required');
  
  try {
    await Save.remove({ id });
    saves = await Save.find({});
  } catch (e) {
    return res.end(400, e.message)
  }
  res.json(saves);
}

module.exports = {
  getSaves,
  saveBook,
  deleteBook,
};
