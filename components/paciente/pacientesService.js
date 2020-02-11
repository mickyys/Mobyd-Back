'use strict';

const paciente = require('./pacienteController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();
const calendar = require('./calendar/pacienteCalendarService');
const tratamiento = require('./tratamientos/tratamientosService');
const informeMedico = require('./informeMedico/informeMedicoService');
const examen = require('./examenLaboratorio/examenLaboratorioService');
const service = require('./servicios/seriviciosServices');
const historial = require('./historial/historialService');

api.get('/page/:page', auth, asyncMiddleware(async(req, res)=>{
    let count =  req.query.count ? req.query.count : 10;
    let name = req.query.name ? req.query.name : null;
    let result = await paciente.getPacientePage(req.params.page, count, name);
    res.send(result);
}));

api.get('/:id?', [auth], asyncMiddleware(async(req, res) =>{
    let result = await paciente.getPaciente(req.params.id);
    res.status(200).send({
        result
    });
}));

api.use('/:id/calendar', calendar);
api.use('/:id/tratamiento', tratamiento);
api.use('/:id/informemedico', informeMedico);
api.use('/:id/examen', examen);
api.use('/:id/servicio', service);
api.use('/:id/historial', historial);

api.get('/tutor/:tutor', [auth], asyncMiddleware(paciente.getPacienteTutor));
api.post('/', [auth], asyncMiddleware(paciente.savePaciente));
api.put('/', [auth], asyncMiddleware(paciente.updPaciente));
api.delete('/:id/:user', [auth], asyncMiddleware(paciente.delPaciente));

module.exports = api;