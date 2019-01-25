'use strict';

const express = require('express');
const {get, add} = require('./historialController');
const asyncMiddleware = require("../../middleware/async");
const auth = require('../../middleware/auth');
const api = express.Router({mergeParams: true});

api.post('/', [auth], asyncMiddleware(add));
api.get('/:idHistorial?', [auth], asyncMiddleware(get));

module.exports = api;