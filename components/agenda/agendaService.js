'use strict';

var express = require('express');
var agenda = require('./agendaController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.post('/', [auth], asyncMiddleware(agenda.save));
api.put('/', [auth], asyncMiddleware(agenda.update));
api.patch('/', asyncMiddleware(agenda.updateConfirmar));
api.get('/', [auth], asyncMiddleware(agenda.get));
api.get('/:id', asyncMiddleware(agenda.getAgenda));
api.get('/patient/:id', [auth], asyncMiddleware(agenda.getPatient));
api.delete('/:id', asyncMiddleware(agenda.remove));
api.head('/:fecha', agenda.time);

module.exports = api;