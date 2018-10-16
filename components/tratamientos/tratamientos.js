'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TratamientoSchema = Schema({
    _id : {type: Mongoose.Schema.ObjectId, default: Mongoose.Types.ObjectId},
    fecha : String,
    hora : String,
    vacuna : [],
    comentario : String,
    precio : Number,
    paciente : String,
    status : { type : Number, default : 1}
});

module.exports = Mongoose.model('tratamientos', TratamientoSchema);