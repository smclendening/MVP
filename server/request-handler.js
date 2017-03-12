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

module.exports.favorites = {
  'get': function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    var promise = FoodModel.find({}).where('favorite').equals(true).exec();

    promise.then(function(favorites) {
      res.end(JSON.stringify(favorites));
      console.log('favs in fav get', favorites);
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

      var promise = FoodModel.update(JSON.parse(body), { $set: {favorite: true}}).exec();

      promise.then(function() {
        res.writeHead(201, {'access-control-allow-origin': '*'});
      })
      .catch(function(err) {
        console.log('error in post fav');
      })
    })
  }
}

module.exports.hates = {
  'get': function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    var promise = FoodModel.find({}).where('hate').equals(true).exec();

    promise.then(function(hates) {
      res.end(JSON.stringify(hates));
      console.log('favs in fav get', hates);
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

      var promise = FoodModel.update(JSON.parse(body), { $set: {hate: true}}).exec();

      promise.then(function() {
        res.writeHead(201, {'access-control-allow-origin': '*'});
      })
      .catch(function(err) {
        console.log('error in post fav');
      })
    })
  }
}

module.exports.delete = {
  'post': function(req, res) {
    var body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {

      var promise = FoodModel.remove(JSON.parse(body)).exec();

      promise.then(function() {
        res.writeHead(201, {'access-control-allow-origin': '*'});
      })
      .catch(function(err) {
        console.log('error in post fav');
      })
    })    
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