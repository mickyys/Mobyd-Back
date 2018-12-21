'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const pacienteCalendar = Schema({
    _id : { 
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    title : {
        type : String,
        required : true
    },
    start: {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    },
    className : {
        type : String,
        required : true
    },
    paciente : {
        type : Mongoose.Schema.Types.ObjectId,
        ref: 'patients',
        required : true
    },
    type : {
        type : String,
        enum : ['ControlEstetico', 'Hospital', 'CirugiaMenor', 'CirugiaMayor', 'Vacuna', 'Desparasitacion', 'Exoticos', 'Otro'],
        required : true
    },
    allDay : {
        ype : Boolean,
        default : false
    },
    editable : {
        type : Boolean,
        default : false
    },
    status : {
        type : Number,
        default : 1
    }                                          
});

module.exports = Mongoose.model('PatientsCalendar', pacienteCalendar);