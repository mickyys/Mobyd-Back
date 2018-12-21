'use strict';

const express = require('express');
const { get, save, update, remove } = require('./pacienteTratamientoController');
const asyncMiddleware = require("../middleware/async");
const auth = require('../middleware/auth');
const api = express.Router();

api.put('/', [auth], asyncMiddleware(update));
api.post('/', [auth], asyncMiddleware(save));
api.get('/:id?', [auth], asyncMiddleware(get));
api.delete('/:id', [auth], asyncMiddleware(remove));

module.exports = api;