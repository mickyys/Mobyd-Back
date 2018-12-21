'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const informeMedicoSchema = Schema({
    _id : { 
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    paciente : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'patients',
        required : true
    },
    fecha : { 
        type : Date, 
        required : true 
    },
    fechaSintomas : {
        type : Date, 
        required : true 
    },
    atencionClinica : Boolean,
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
    status : {
        type : Number,
        default : 1
    }   
});

module.exports = Mongoose.model('PatientsReportMedical', informeMedicoSchema);