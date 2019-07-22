'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const revacunacionSchemma = Schema({
    date : { type : Date , required : true},        
    tutor : { type: Mongoose.Schema.Types.ObjectId, ref: 'tutors' , required :  true},
    paciente : { type: Mongoose.Schema.Types.ObjectId, ref: 'patient', required : true},       
    vacuna : { type : String },
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date},
    status : { type : Number, default : 1}
});

module.exports = Mongoose.model('revacunacion', revacunacionSchemma);