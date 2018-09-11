'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var comunaSchema = Schema({
    _id : Number,
    descripcion : String,
    region_id : Number
});

module.exports = Mongoose.model('comunas', comunaSchema);