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
    precio : Number,
    status : { type : Number , default : 1 },    
    userCreate : {},
    userModify : {},
    dateCreate : { type : Date},
    dateModify : { type : Date}
});

module.exports = Mongoose.model('vacuna', VacunasSchema);

