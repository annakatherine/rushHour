var express = require('express');
var router = express.Router();
var distance = require('google-distance');
var connectionString = 'postgres://localhost:5432/times';
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');
var moment = require('moment');
console.log( 'arrived in the time.js folder');
console.log( 'date: ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAz254Drq9qP0wB1Hi4_a5Jyqm5T5X1m0A'
});

var request = require('request-promise');

var options = {
  method: 'POST',
  uri: 'https://maps.googleapis.com/maps/api/distancematrix/json?&&key=AIzaSyAz254Drq9qP0wB1Hi4_a5Jyqm5T5X1m0A',
  qs: {
        origins:'2304 Harriet Ave Minneapolis',
        destinations:'1438 Simpson Street, Saint Paul, MN',
        mode:'driving',
        departure_time: 'now',
        traffic_model: 'best_guess'
  }

};
request(options)
.then(function( response ) {
console.log( 'hello?, res: ' + response.rows );

})
.catch(function(err){

});

router.get('*/', function( req, res, next ){
  console.log( 'inside router.post' );
  var results = {
    origin: req.body.origin
  };
  console.log( results.origin + ': req.body.origin ');
  distance.get(
    {
      origin: '1438 Simpson Street, Saint Paul, MN',
      destination: '2304 Harriet Ave Minneapolis, MN',
      departure_time: Math.round(new Date().getTime()/1000.0),
      traffic_model: 'best_guess',
      mode: 'driving',
    },
    function(err, data){
      console.log( 'data: ' + data.duration_in_traffic + ' ' + data.duration );
    var i = 1;
    // console.log( 'data: ' + data[i].routes + ' ' + data.duration );

    var timer = setTimeout(function(  ) {
      var timeLogged = {
       origin: data.origin,
       destination: data.destination,
       mode: data.mode,
       duration: data.duration,
      //  duration_in_traffic:
       distance: data.distance,
       now: moment().format('MMMM Do YYYY, h:mm:ss a'),
       departure_time: data.departure_time
     };
     pg.connect(connectionString, function(err, client, done) {
       client.query("INSERT INTO trip ( origin, destination, mode, duration, distance, now  ) VALUES ( $1, $2, $3, $4, $5, $6) RETURNING id",
         [ timeLogged.origin, timeLogged.destination, timeLogged.mode, timeLogged.duration, timeLogged.distance, timeLogged.now ],
           function (err, result) {
             if(err) {
               console.log("Error inserting data: ", err);
               next(err);
             } else {
               console.log( 'req.body.id: ', data);
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
