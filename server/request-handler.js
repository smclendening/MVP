var server = require('../server');

module.exports = {
  'get': function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    var data = [{name: 'Tri-Tip', cals: 50}, {name: 'Subway', cals: 500}];

    res.end(JSON.stringify(data));
  }
}