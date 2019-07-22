const { add, get, remove } = require('./revacunacionController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/:dateBegin?/:dateEnd?', [auth], asyncMiddleware(get));
api.delete('/:id', [auth], asyncMiddleware(remove));
api.post('/', [auth], asyncMiddleware(add));

module.exports = api;