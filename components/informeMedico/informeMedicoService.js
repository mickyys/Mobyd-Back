'use strict';

var express = require('express');
var {getInformeMedico, delInformeMedico , updInformeMedico, addInformeMedico} = require('./informeMedicoController');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.put('/', asyncMiddleware(updInformeMedico));
api.post('/', asyncMiddleware(addInformeMedico));
api.get('/:id?', asyncMiddleware(getInformeMedico));
api.delete('/:id', asyncMiddleware(delInformeMedico));

module.exports = api;