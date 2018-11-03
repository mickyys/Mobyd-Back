'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var razasSchemma = Schema({
    id : Number,
    raza : String,
    especie : String
});

module.exports = Mongoose.model('razas', razasSchemma);