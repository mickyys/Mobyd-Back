'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var razasSchemma = Schema({
    id : Number,
    raza : String,
    especie : String,
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now},
    status : { type : Number, default : 1}
});

module.exports = Mongoose.model('razas', razasSchemma);