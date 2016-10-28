var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 6666;
var pg = require('pg');
var bodyParser = require('body-parser');
var path = require('path');
var connectionString = 'postgres://localhost:5432/time';
var router = express.Router();
var distance = require('google-distance');

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
