'user strict'

var express = require('express');
var paciente = require('./pacienteController');
var api = express.Router();

api.get('/:id?', paciente.getPaciente);
api.post('/', paciente.savePaciente);
api.put('/', paciente.updPaciente);
api.delete('/:id/:user', paciente.delPaciente);

module.exports = api;