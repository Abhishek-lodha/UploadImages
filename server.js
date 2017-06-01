const express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  request = require("request"),
  path = require("path"),
  multer = require("multer"),
  cors = require("cors"),
  winston = require('winston');

let upload = multer({
  dest: __dirname + '/public/uploads/',
});

let router = express.Router();

const logger = new winston.Logger({
  level: 'verbose',
  transports: [
    // new winston.transports.Console({
    //   timestamp: true
    // }),
    new winston.transports.File({
      filename: 'app.log',
      timestamp: true
    })
  ]
});

app.use(cors());

app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendfile("static/index.html");
});

app.post('/upload', upload.single('image'), (req, res) => {
  logger.info(req.file);
  res.send(req.file.originalname + " saved successfully");
});

app.listen(8080, function() {
  console.log("Working on port 8080");
});
module.exports = app;
