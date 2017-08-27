const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const _PORT_ = process.env.PORT || 8060;
let saves = require('./saves.json');

app.set('port', _PORT_);
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'build/index.html'))
});

app.get('/api/saves', function(req, res) {
  fs.readFile('./saves.json', 'utf8', function(err, data) {
    if (err)
      console.log(err);
    res.send(data);
  });
});

app.post('/api/saves', function(req) {
  const data = req.body;
  
  if (data) {
    saves.push(data);
    
    fs.writeFile('./saves.json', JSON.stringify(saves), function(err) {
      if(err)
        return console.log(err);
      console.log("The file was saved!");
    })
  }
});

app.delete('/api/saves', function(req) {
  const id = req.param('id');
  
  saves = saves.filter(function (save) {
    return save.id !== id;
  });
  fs.writeFile('./saves.json', JSON.stringify(saves), function(err) {
    if(err)
      return console.log(err);
    
    console.log("The file was deleted!");
  })
});

app.get('/**', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'build/index.html'))
});

app.listen(_PORT_, function() {
  console.log(`Listening on port ${_PORT_}`);
});