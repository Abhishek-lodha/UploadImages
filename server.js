const express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  request = require("request"),
  path = require("path"),
  multer = require("multer"),
  cors = require("cors"),
  winston = require('winston'),
  mongo = require('mongodb'),
  mongoose = require('mongoose');

let Schema = mongoose.Schema;
let schemaName = new Schema({
  originalname: String,
  name: String,
  imagePath: String,
  thumbnailPath: String
}, {
  collection: 'collectionName'
});

schemaName.post('save', (doc) => {
  console.log(doc._id);
});

var Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://localhost:27017/uploadImages');

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
  var savedata = new Model({
    'originalname': req.file.originalname,
    'name': req.file.filename,
    'imagePath': req.file.path
  }).save(function(err, result) {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
  // res.send(req.file.originalname + " saved successfully");
});

app.listen(8080, function() {
  console.log("Working on port 8080");
});
module.exports = app;
