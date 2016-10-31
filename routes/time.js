var express = require('express');
var router = express.Router();
var distance = require('google-distance');
var connectionString = 'postgres://localhost:5432/times';
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');
var moment = require('moment');
// moment().format('MMMM Do YYYY, h:mm:ss a');
console.log( 'arrived in the time.js folder');
console.log( 'date: ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
var api = distance.key = "AIzaSyAvbUTpswKFmmzVTkbqbXS1H-gjvtviG_U";

router.post('*/', function( req, res, next ){
  console.log( 'inside router.post', req.body );
  distance.get(
    {
      origin: '1438 Simpson Street, Saint Paul, MN',
      destination: '2304 Harriet Ave Minneapolis, MN',
      mode: 'driving',
      departure_time: 'default'
    },
    function(err, data){
    var i = 1;
    var timer = setTimeout(function(  ) {
      var timeLogged = {
       origin: data.origin,
       destination: data.destination,
       mode: data.mode,
       duration: data.duration,
       distance: data.distance,
       now: moment().format('MMMM Do YYYY, h:mm:ss a'),
       // departure_time: departure_time
     };
     pg.connect(connectionString, function(err, client, done) {
       client.query("INSERT INTO trip ( origin, destination, mode, duration, distance, now  ) VALUES ( $1, $2, $3, $4, $5, $6) RETURNING id",
         [ timeLogged.origin, timeLogged.destination, timeLogged.mode, timeLogged.duration, timeLogged.distance, timeLogged.now ],
           function (err, result) {
             if(err) {
               console.log("Error inserting data: ", err);
               next(err);
             } else {
               console.log( 'req.body.id: ', req.body.id);
             }
               res.send(  );
                done();
           });//end of client.query
         });//end of pg.connect
       i++;
       timer = setTimeout(arguments.callee, 2000);
     }, 2000); //end of timer
});
}); //end of distance matrix

module.exports = router;
