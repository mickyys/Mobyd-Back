'use strict';

const paciente = require('./pacienteController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();
const calendar = require('./calendar/pacienteCalendarService');
const tratamiento = require('./tratamientos/tratamientosService');
const informeMedico = require('./informeMedico/informeMedicoService');
const examen = require('./examenLaboratorio/examenLaboratorioService');


api.use('/:id/calendar', calendar);
api.use('/:id/tratamiento', tratamiento);
api.use('/:id/informemedico', informeMedico);
api.use('/:id/examen', examen);

api.get('/:id?', [auth], asyncMiddleware(paciente.getPaciente));
api.post('/', [auth], asyncMiddleware(paciente.savePaciente));
api.put('/', [auth], asyncMiddleware(paciente.updPaciente));
api.delete('/:id/:user', [auth], asyncMiddleware(paciente.delPaciente));

module.exports = api;