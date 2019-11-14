'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var informeMedicoSchema = Schema({
    _id : { 
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    paciente : {
        type: String,
        required : true
    },
    fecha : { 
        type : Date, 
        required : true 
    },
    fechaSintomas : {
        type : Date
    },
    atencionClinica : String,
    primeraVez : Boolean,
    motivo  : String,
    examenFisico : String,
    receta : String,
    fc : Number,
    fr : Number,
    pa : Number,
    tllc : Number,
    temperatura : Number,
    mucosas : {
        type : Mongoose.Schema.Types.ObjectId,
        ref: 'mucosas'
    },
    peso : {
        type : Number,
        min : 0
    },
    presuntivo : String,
    diferencial : String,
    laboratorio : String,
    definitivo : String,
    medicacion : String,
    valor : {
        type : Number,
        min : 0
    },
    services : [],
    products : [],
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date} ,
    status : {
        type : Number,
        default : 1
    }   
});

module.exports = Mongoose.model('PatientMedicalReport', informeMedicoSchema);