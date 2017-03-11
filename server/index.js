var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./request-handler');
//require database here

var app = express();

module.exports.app = app;

// serve the static files
app.use(express.static(__dirname + '/../client/dist'));


// set up routes
app.get('/food', handler.get);

app.post('/food', handler.post);

app.listen(8080, function() {
  console.log('listening on port 8080');
})