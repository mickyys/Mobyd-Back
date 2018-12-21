'use strict';

const paciente = require('./pacienteController');
const auth = require('../middleware/auth');
const api = require('express').Router();
const pacienteCalendar = require('./calendar/pacienteCalendarService');

api.use('/:id/calendar', pacienteCalendar);


api.get('/:id?', paciente.getPaciente);
api.get('/search/:search', paciente.getSearchPaciente);
api.post('/', paciente.savePaciente);
api.put('/', paciente.updPaciente);
api.delete('/:id/:user', paciente.delPaciente);

module.exports = api;