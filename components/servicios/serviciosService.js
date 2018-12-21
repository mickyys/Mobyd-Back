'use strict';

const express = require('express');
const { getServicio, addServicio, updServicio, delServicio} = require('./serviciosController');
const asyncMiddleware = require("../middleware/async");
const auth = require('../middleware/auth');
const api = express.Router();

api.put('/', [auth], asyncMiddleware(updServicio));
api.post('/', [auth], asyncMiddleware(addServicio));
api.get('/', [auth], asyncMiddleware(getServicio));
api.delete('/:id', [auth], asyncMiddleware(delServicio));

module.exports = api;