const express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  request = require("request"),
  path = require("path"),
  multer = require("multer"),
  cors = require("cors");

var upload = multer({
  dest: __dirname + '/public/uploads/',
});

app.use(cors());

app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendfile("static/index.html");
});

app.post('/upload', upload.single('image'), (req, res) => {
  // res.json({req.files});
});

app.listen(8080, function() {
  console.log("Working on port 8080");
});
module.exports = app;
