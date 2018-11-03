'use strict';

var express = require('express');
var desparasitante = require('./desparasitanteController');
var api = express.Router();

api.get('/', desparasitante.getDesparasitante);
api.get('/servicio', desparasitante.getServicio);
api.post('/', desparasitante.saveDesparasitante);
api.post('/servicio', desparasitante.saveServicio);

module.exports = api;