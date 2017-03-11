var server = require('../server');
var FoodModel = require('../db');
var data = [{name: 'Tri-Tip', cals: 50, comment: 'Wow!'}, {name: 'Subway', cals: 500, comment: 'Hmmmm'}];
var Promise = require('Bluebird');

module.exports = {
  'get': function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    var promise = FoodModel.find({}).exec();

    promise.then(function(people) {
      console.log(people);
      res.end(JSON.stringify(people));
    })
    .catch(function(err) {
      console.log('error in get request', err);
    })

    // FoodModel.find({}, function(err, people) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(people);
    //   }
    // });

    // res.end(people);
  },
  'post': function(req, res) {
    console.log('in post');
    var body = '';
      // can either use string or array here 
    req.on('data', (chunk) => {
      console.log(chunk);
      body += chunk;
    });
    req.on('end', () => {
        // we have our body
      var newFood = JSON.parse(body);
      // data.push(newFood);
      var foodEntry = new FoodModel(newFood);

      foodEntry.save(function(err) {
        if (err) console.log(err);
        console.log(foodEntry);
      }); // should be saved now 
      // probably have to JSON parse it 
      res.writeHead(201, {'access-control-allow-origin': '*'});
    });
  }
}
