var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: String,
    cals: String,
    comment: String
});

var Food = mongoose.model('FoodModel', FoodSchema);