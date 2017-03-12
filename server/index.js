var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./request-handler');
//require database here
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var app = express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected');
});

// serve the static files
app.use(express.static(__dirname + '/../client/dist'));


// set up routes
app.get('/food', handler.food.get);
app.get('/calories', handler.calories.get);
app.post('/food', handler.food.post);
app.post('/favorites', handler.favorites.post);
app.get('/favorites', handler.favorites.get);
app.post('/hates', handler.hates.post);
app.get('/hates', handler.hates.get);
app.post('/delete', handler.delete.post);

app.listen(8080, function() {
  console.log('listening on port 8080');
});