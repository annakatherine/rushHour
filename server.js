var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 6666;

app.listen(port);
console.log( 'app listening on port: ' + port );

var time = require('./routes/time');

require('./routes/time.js');

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAvbUTpswKFmmzVTkbqbXS1H-gjvtviG_U'
});
//
