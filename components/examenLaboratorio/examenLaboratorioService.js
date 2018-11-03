'use strict';

var express = require('express');
var {addExamenLaboratorio, getExamenLaboratorio, updExamenLaboratorio, delExamenLaboratorio } = require('./examenLaboratorioController');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.put('/', asyncMiddleware(updExamenLaboratorio));
api.post('/', asyncMiddleware(addExamenLaboratorio));
api.get('/:id?', asyncMiddleware(getExamenLaboratorio));
api.delete('/:id', asyncMiddleware(delExamenLaboratorio));

module.exports = api;