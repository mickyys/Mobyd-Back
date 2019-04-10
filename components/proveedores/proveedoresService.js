const { get } = require('./proveedoresController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/:id?', [auth], asyncMiddleware(get));

module.exports = api;