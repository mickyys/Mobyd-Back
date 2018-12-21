'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

const PatientsTreatment = Schema({
    _id : {
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    paciente : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'patients',
        required : true
    },
    fecha : String,
    hora : String,
    vacuna : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'vacunas'
    },
    servicio : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'servicioDesparasitante'
    },
    desparasitante : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'desparasitante'
    },
    comentario : String,
    precio : Number,    
    status : { 
        type : Number, 
        default : 1
    },
    tipo : { 
        type : String,
        enum : ['Vacuna', 'Desparasitante', 'Ectoparasitos'],
        required : true
    }
});

module.exports = Mongoose.model('patientsTreatment', PatientsTreatment);