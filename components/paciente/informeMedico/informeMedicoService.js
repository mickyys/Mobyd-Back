'use strict';

const express = require('express');
const {getInformeMedico, delInformeMedico , updInformeMedico, addInformeMedico} = require('./informeMedicoController');
const asyncMiddleware = require("../../middleware/async");
const auth = require('../../middleware/auth');
const api = express.Router({mergeParams: true});

api.put('/', [auth], asyncMiddleware(updInformeMedico));
api.post('/', [auth], asyncMiddleware(addInformeMedico));
api.get('/:informe?', [auth], asyncMiddleware(getInformeMedico));
api.delete('/:informe', [auth], asyncMiddleware(delInformeMedico));

module.exports = api;