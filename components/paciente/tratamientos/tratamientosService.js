'use strict';

var express = require('express');
var tratamiento = require('./tratamientosController');
const asyncMiddleware = require("../../middleware/async");
const auth = require('../../middleware/auth');
var api = express.Router({mergeParams: true});

api.post('/', [auth], asyncMiddleware(tratamiento.save));
api.get('/', [auth], asyncMiddleware(tratamiento.get));
api.delete('/:tratamiento', [auth], asyncMiddleware(tratamiento.remove));

module.exports = api;