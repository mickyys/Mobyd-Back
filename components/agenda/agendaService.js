'use strict';

var express = require('express');
var agenda = require('./agendaController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.post('/', [auth], asyncMiddleware(agenda.save));
api.put('/', [auth], asyncMiddleware(agenda.update));
api.patch('/', [auth], asyncMiddleware(agenda.updateConfirmar));
api.get('/', [auth], asyncMiddleware(agenda.get));
api.delete('/:id', [auth], asyncMiddleware(agenda.remove));
api.head('/:fecha', agenda.time);

module.exports = api;