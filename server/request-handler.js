var server = require('../server');
var FoodModel = require('../db');
// var data = [{name: 'Tri-Tip', cals: 50, comment: 'Wow!'}, {name: 'Subway', cals: 500, comment: 'Hmmmm'}];
var Promise = require('Bluebird');

module.exports.food = {
  'get': function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    var promise = FoodModel.find({}).exec();
    // if add ID/key to each entry later, will have to specify what to return

    promise.then(function(people) {
      res.end(JSON.stringify(people));
      console.log(people);
    })
    .catch(function(err) {
      console.log('error in get request', err);
    })
  },
  'post': function(req, res) {
    var body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {

      var newFood = JSON.parse(body);
      var foodEntry = new FoodModel(newFood);

      foodEntry.save(function(err) {
        if (err) console.log(err);
      }); // should be saved now 
      res.writeHead(201, {'access-control-allow-origin': '*'});
    });
  }
}

module.exports.calories = {
  'get': function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    var promise = FoodModel.find({}, {cals: 1}).exec();

    promise.then(function(cals) {
      console.log('data inside cal get request: ', cals);
      // array of objs w/ cal property
      res.end(JSON.stringify(cals));
    })
    .catch(function(err) {
      console.log('error in cal get request', err);
    })
  }
}