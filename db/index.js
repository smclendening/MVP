var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: String,
    cals: String,
    comment: String,
    id: Number
});

module.exports = mongoose.model('FoodModel', FoodSchema);


