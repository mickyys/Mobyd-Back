'use strict';

const express = require('express');
const {getInformeMedico, delInformeMedico , updInformeMedico, addInformeMedico} = require('./informeMedicoController');
const asyncMiddleware = require("../middleware/async");
const api = express.Router();

api.put('/', asyncMiddleware(updInformeMedico));
api.post('/', asyncMiddleware(addInformeMedico));
api.get('/:id?', asyncMiddleware(getInformeMedico));
api.delete('/:id', asyncMiddleware(delInformeMedico));

module.exports = api;