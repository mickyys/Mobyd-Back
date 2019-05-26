const { get, add, update, remove } = require('./proveedoresController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/:id?', [auth], asyncMiddleware(get));
api.delete('/:id', [auth], asyncMiddleware(remove));
api.post('/', [auth], asyncMiddleware(add));
api.put('/', [auth], asyncMiddleware(update));

module.exports = api;