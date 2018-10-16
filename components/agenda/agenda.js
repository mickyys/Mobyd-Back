'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var agendaSchemma = Schema({
    fecha: Date,
    hora : String,
    informacion : String,
    paciente : String,
    status : { type : Number, default : 1}
});

module.exports = Mongoose.model('agenda', agendaSchemma);