'use strict';

var express = require('express');
var agenda = require('./agendaController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.post('/', [auth], asyncMiddleware(agenda.save));
api.get('/', [auth], asyncMiddleware(agenda.get));

module.exports = api;