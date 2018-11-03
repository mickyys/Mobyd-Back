'use strict';

var express = require('express');
var agenda = require('./agendaController');
var api = express.Router();

api.post('/', agenda.saveAgenda);

module.exports = api;