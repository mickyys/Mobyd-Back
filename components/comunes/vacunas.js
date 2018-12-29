'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var VacunasSchema = Schema({
    _id : {
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    descripcion : String,
    laboratorio : { 
        type: Mongoose.Schema.Types.ObjectId, 
        ref: 'laboratorios'
    },
    precio : Number     
});

module.exports = Mongoose.model('vacuna', VacunasSchema);

