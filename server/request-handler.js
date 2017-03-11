var server = require('../server');

var data = [{name: 'Tri-Tip', cals: 50}, {name: 'Subway', cals: 500}];


module.exports = {
  'get': function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    res.end(JSON.stringify(data));
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
      console.log(body);
      var newFood = JSON.parse(body);
      data.push(newFood);
      // probably have to JSON parse it 
      res.writeHead(201, {'access-control-allow-origin': '*'});
    });
  }
}