'use strict';

var express = require('express');
var tratamiento = require('./tratamientosController');
var api = express.Router();

api.post('/', tratamiento.saveTratamiento);
api.get('/', tratamiento.getTratamiento);

module.exports = api;