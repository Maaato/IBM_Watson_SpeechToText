const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/speech-to-text-frontend'));
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: 'dist/speech-to-text-frontend/'});
});

app.listen(process.env.PORT);
