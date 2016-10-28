var express = require('express');
var app = express();
var router = express.Router();
var distance = require('google-distance');
var connectionString = 'postgres://localhost:5432/times';
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');

console.log( 'inside routes/time.js');

var timeLogged = {
  origin: '',
  destination: '',
  mode: '',
  time: ''
};

distance.apiKey = "AIzaSyAvbUTpswKFmmzVTkbqbXS1H-gjvtviG_U";
// var timerFunction = function(){
  // console.log( 'inside timer function');
  distance.get(
  {
    origin: '2304 Harriet Ave, Minneapolis MN',
    destination: 'Prime Digital Academy, Bloomington, MN',
    mode: 'driving'
  },


function(err, data) {
    if (err) return console.log(err);
    console.log(data);
    var i = 1;
    var timer = setTimeout(function(  ) {
      console.log( 'inside timer, data: ' + data.duration );
        i++;
        timer = setTimeout(arguments.callee, 40000);
      }, 40000);
      timeLogged = {
        origin: data.origin,
        destination: data.destination,
        mode: data.mode,
        time: data.duration
      };
      console.log( 'timeLogged.origin: ' + timeLogged.origin + ', ' + timeLogged.destination + ', ' + timeLogged.mode + ', ' + timeLogged.time );
     }


);//end of distance.get
//
app.get('/', function( req, res, next ){
//   console.log( 'inside router.post for reviews', req.body );
    var timeSaved = {
      origin: req.body.origin,
      destination: req.body.destination,
      mode: req.body.mode,
      time: req.body.time,
    };
    console.log('new review:', timeSaved);

    pg.connect(connectionString, function(err, client, done) {
      var newTime = client.query("INSERT INTO trip ( origin, destination, mode, time ) VALUES ( $1, $2, $3, $4 ) RETURNING id",
        [ newTime.origin, newTime.destination, newTime.mode, newTime.time ],
          function (err, result) {
            if(err) {
              console.log("Error inserting data: ", err);
              next(err);
            } else {
              console.log( 'req.body.id: ', req.body.id);
            }
              res.send( newTime );
               done();
          });//end of client.query
        });//end of pg.connect
      });//end of app.add post



console.log( 'timeLogged: ' + timeLogged );
console.log( 'hello');

module.exports = router;
