'use strict';

var express = require('express');
var raza = require('./razasController');
var api = express.Router();

api.get('/', raza.getRazas);

module.exports = api;