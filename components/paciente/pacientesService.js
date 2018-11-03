'use strict';

const express = require('express');
const paciente = require('./pacienteController');
const auth = require('../middleware/auth');
const api = express.Router();

api.get('/:id?', paciente.getPaciente);
api.get('/search/:search', paciente.getSearchPaciente);
api.post('/', paciente.savePaciente);
api.put('/', paciente.updPaciente);
api.delete('/:id/:user', paciente.delPaciente);

module.exports = api;