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
    className : String,
    horaInicio : String,
    horaTermino : String,
    tutor : { type: Mongoose.Schema.Types.ObjectId, ref: 'tutors'},
    paciente : { type: Mongoose.Schema.Types.ObjectId, ref: 'patient'},      
    medico : {type: Mongoose.Schema.Types.ObjectId, ref: 'User' },   
    nombrePaciente : String,
    nombreTutor : String,
    rut : String,
    correo : String,
    telefono : String,
    confirmar : { type : Boolean , default : false},
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now},
    status : { type : Number, default : 1}
});

Mongoose.set('debug', true);

module.exports = Mongoose.model('agenda', agendaSchemma);