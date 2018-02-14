const Save = require('../models/saves');

const getSaves = async (req, res, next) => {
  let data;
  try {
    data = await Save.find({});
  } catch (e) {
    return next({
      status: 400,
      message: 'server error',
    })
  }
  res.send(data);
};

const saveBook = async (req, res, next) => {
  try {
    await Save.create(req.body);
  } catch (e) {
    return next({
      status: 400,
      message: 'server error',
    })
  }
  res.json(await Save.find({}));
};

const deleteBook = async (req, res, next) => {
  const id = req.param('id');
  let saves;
  if (!id)
    return next({
      status: 400,
      message: 'id is required',
    });
  
  try {
    await Save.remove({ id });
    saves = await Save.find({});
  } catch (e) {
    return next({
      status: 500,
      message: 'server error',
    });
  }
  res.json(saves);
}

module.exports = {
  getSaves,
  saveBook,
  deleteBook,
};
