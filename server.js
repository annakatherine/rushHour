var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var port = process.env.PORT || 7777;
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = 'postgres://localhost:5432/time';
var distance = require('google-distance');
// var expressPrettylogger = require('express-prettylogger');
// app.use(express.logger('pretty'));


app.get('/', function (req, res) {

  res.send('Hello World!');
  res.end();
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port);
console.log( 'app listening on port: ' + port );

app.use(express.static(path.join(__dirname, '/')));

// app.use(express.static('/time'));
var time = require('./routes/time.js');
app.use('/time', time);

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAvbUTpswKFmmzVTkbqbXS1H-gjvtviG_U'
});
//
