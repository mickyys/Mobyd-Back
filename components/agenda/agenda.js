'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var agendaSchemma = Schema({
    start : Date,
    end : Date,
    title : String,
    description : String,  
    url : String,
    textColor : String,
    horaInicio : String,
    horaTermino : String,
    tutor : { type: Mongoose.Schema.Types.Mixed, ref: 'tutors'},
    paciente : { type: Mongoose.Schema.Types.Mixed, ref: 'patients'},         
    nombrePaciente : String,
    nombreTutor : String,
    rut : String,
    correo : String,
    telefono : String,
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now},
    status : { type : Number, default : 1}
});

module.exports = Mongoose.model('agenda', agendaSchemma);