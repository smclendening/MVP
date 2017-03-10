var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

//require database here

var app = express();

module.exports.app = app;

// serve the static files
app.use(express.static(__dirname + '/../client/dist'));


// set up routes
// ex: get /food 
app.get('/food', function(req, res) {
  // send back list of transactions 
  res.writeHead(200, {'Content-Type': 'application/json'});
  var data = [{
        name: 'Tri-Tip',
        cals: 50
      }, {
        name: 'Subway',
        cals: 500
      }];
  res.end(JSON.stringify(data));
});

app.listen(8080, function() {
  console.log('listening on port 8080');
})