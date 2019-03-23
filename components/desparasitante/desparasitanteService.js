'use strict';

var express = require('express');
var desparasitante = require('./desparasitanteController');
var api = express.Router();
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");

api.get('/', [auth], asyncMiddleware( desparasitante.getDesparasitante));
api.get('/servicio', [auth], asyncMiddleware( desparasitante.getServicio));
api.post('/', [auth], asyncMiddleware( desparasitante.saveDesparasitante));
api.put('/', [auth], asyncMiddleware( desparasitante.updateDesparasitante));
api.delete('/:id/:user', [auth], asyncMiddleware( desparasitante.removeDesparasitante));
api.post('/servicio', [auth], asyncMiddleware( desparasitante.saveServicio));

module.exports = api;