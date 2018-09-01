'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var paciente = require('./components/paciente/pacientesService');
var tutor = require('./components/tutor/tutorsService');

var app = express();
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use('/paciente', paciente);
app.use('/tutor', tutor);

module.exports = app;