'use strict';

var express = require('express');
var {save, get, update, remove, removeFile } = require('./examenLaboratorioController');
const asyncMiddleware = require("../../middleware/async");
const auth = require('../../middleware/auth');
var api = express.Router({mergeParams: true});

api.put('/', [auth], asyncMiddleware(update));
api.post('/',[auth], asyncMiddleware(save));
api.get('/:examen?', [auth], asyncMiddleware(get));
api.delete('/:examen', [auth], asyncMiddleware(remove));
api.delete('/:examen/:file', [auth], asyncMiddleware(removeFile));

module.exports = api;