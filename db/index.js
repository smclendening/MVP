var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: String,
    cals: String,
    comment: String,
    favorite: Boolean,
    hate: Boolean,
    id: String
});

module.exports = mongoose.model('FoodModel', FoodSchema);


