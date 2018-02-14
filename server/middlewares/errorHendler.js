
module.exports = ({ status, message }, req, res, next) => {
  res.status(status || 500).end(message || 'server error');
  next();
};
