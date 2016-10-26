var express = require('express');
var app = express();
var router = express.Router();
console.log( 'inside routes/time.js');

var data = 0;
var distance = require('google-distance');
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
    console.log(data.duration);
    var i = 1;
    var timer = setTimeout(function(  ) {
      console.log( 'inside timer, data: ' + data.duration );
        i++;
        timer = setTimeout(arguments.callee, 300000);
      }, 300000);

});
// };




console.log( 'data: ' + data );
// console.log( 'time: ' + data.duration );
// router.post('/', function ( origins, destinations ){
//   googleMapsClient.geocode({
//       address: origins,
//     }, function(err, response){
//       if(!err) {
//         console.log( response.json.results);
//         var originAddress = response.json.results;
//       }
//     });
// });

module.exports = router;
