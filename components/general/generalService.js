const { add, get, update } = require('./generalController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/:id', [auth], asyncMiddleware(get));
api.post('/', [auth], asyncMiddleware(add));
api.put('/', [auth], asyncMiddleware(update));

module.exports = api;