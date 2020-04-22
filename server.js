const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/speechToTextFrontend'));
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: 'dist/speechToTextFrontend/'});
});

app.listen(process.env.PORT);
