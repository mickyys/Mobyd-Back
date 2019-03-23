'use strict';

const express = require('express');
const raza = require('./razasController');
const api = express.Router();
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");

api.get('/', [auth], asyncMiddleware(raza.get));
api.post('/', [auth], asyncMiddleware(raza.add));
api.put('/', [auth], asyncMiddleware(raza.update));
api.delete('/:id/:user', [auth], asyncMiddleware(raza.remove));

module.exports = api;