
module.exports = function(req, res, err, next){
  console.log('errHendl',arguments)
  next();
}