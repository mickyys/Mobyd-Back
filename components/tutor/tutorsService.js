'user strict'

var express = require('express');
var tutor = require('./tutorsController');
var api = express.Router();

api.get('/:id?', tutor.getTutor);
//api.post('/', paciente.savePaciente);
//api.put('/', paciente.updPaciente);
//api.delete('/:id/:user', paciente.delPaciente);

module.exports = api;