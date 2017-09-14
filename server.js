const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const _PORT_ = process.env.PORT || 8050;
let saves = require('./saves.json');

app.set('port', _PORT_);
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.get('/api/saves', (req, res) => {
  fs.readFile('./saves.json', 'utf8', (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

app.post('/api/saves', (req, res) => {
  const data = req.body;
  if (data) {
    saves.push(data);

    fs.writeFile('./saves.json', JSON.stringify(saves), (err) => {
      if (err) return console.log(err);
      res.send(saves);
      console.log('The file was saved!');
    });
  }
});

app.delete('/api/saves', (req, res) => {
  const id = req.param('id');

  saves = saves.filter((save) => {
    return save.id !== id;
  });
  fs.writeFile('./saves.json', JSON.stringify(saves), (err) => {
    if (err) return console.log(err);
    res.send(saves);
    console.log('The file was deleted!');
  });
});

app.get('/**', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.listen(_PORT_, () => {
  console.log(`Listening on port ${_PORT_}`);
});
