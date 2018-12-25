'use strict';

const paciente = require('./pacienteController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();
const pacienteCalendar = require('./calendar/pacienteCalendarService');

api.use('/:id/calendar', pacienteCalendar);


api.get('/:id?', [auth], asyncMiddleware(paciente.getPaciente));
api.post('/', [auth], asyncMiddleware(paciente.savePaciente));
api.put('/', [auth], asyncMiddleware(paciente.updPaciente));
api.delete('/:id/:user', [auth], asyncMiddleware(paciente.delPaciente));

module.exports = api;