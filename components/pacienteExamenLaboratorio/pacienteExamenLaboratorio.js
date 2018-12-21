'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const examenLaboratorio = Schema({
    _id : { 
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    paciente : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'patients',
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
});

module.exports = Mongoose.model('PatientsExamLaboratory', examenLaboratorio);