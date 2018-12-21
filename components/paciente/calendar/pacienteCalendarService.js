
const express = require('express');
const asyncMiddleware = require("../../middleware/async");
const auth = require('../../middleware/auth');
const api = express.Router();
const { get, save, update, remove } = require('./pacienteCalendarController');

api.put('/', [auth], asyncMiddleware(update));
api.post('/', [auth], asyncMiddleware(save));
api.get('/', [auth], asyncMiddleware(get));
api.delete('/:id', [auth], asyncMiddleware(remove));

module.exports = api;