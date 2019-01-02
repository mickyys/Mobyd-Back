'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

module.exports.ExamenLaboratorio = Mongoose.model('PatientExams', Schema({
    _id : { 
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    paciente : {
        type : String,
        required : true
    },
    date : { 
        type : Date, 
        required : true 
    },
    comment : {
        type : String
    },
    exam : {
        type : Mongoose.Schema.Types.ObjectId,
        ref: 'examen',
        required : true
    },
    price : {
        type : Number,      
    },
    file : [{
        type : Mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    status : {
        type : Number,
        default : 1
    }    
}));