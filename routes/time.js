var express = require('express');
var app = express();
var router = express.Router();
console.log( 'inside time.js');


var distance = require('google-distance');
distance.apiKey = "AIzaSyAvbUTpswKFmmzVTkbqbXS1H-gjvtviG_U";

distance.get(
  {
    origin: '2304 Harriet Ave, Minneapolis MN',
    destination: 'Prime Digital Academny, Bloomington, MN',
    mode: 'driving'
  },

  function(err, data) {
    if (err) return console.log(err);
    console.log(data.duration);
});

router.post('/', function ( origins, destinations ){
  googleMapsClient.geocode({
      address: origins,
    }, function(err, response){
      if(!err) {
        console.log( response.json.results);
        var originAddress = response.json.results;
      }
    });
});

module.exports = router;
