'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var ServicioSchema = Schema({
    _id : {type: Mongoose.Schema.ObjectId, default: Mongoose.Types.ObjectId},
    tamano : String,
    factor : Number,
    status : {type : Number, default : 1}     
});

module.exports = Mongoose.model('servicioDesparasitante', ServicioSchema);