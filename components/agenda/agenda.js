'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const AgendaType = {
    Agenda : 'agenda',
    Control : 'control'
}

const agendaSchemma = Schema({
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
    type : { type : String, default : AgendaType.Agenda },
    sendMail : { type : Boolean , default : false},
    value : { type : Number },
    confirmar : { type : Boolean , default : false},
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now},
    status : { type : Number, default : 1}
});


module.exports.Agenda = Mongoose.model('agenda', agendaSchemma);
module.exports.AgendaType = AgendaType;