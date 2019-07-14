'use strict';

var express = require('express');
var { addExamen, getExamen, updExamen, delExamen } = require('./examenController');
const asyncMiddleware = require("../middleware/async");
const auth = require('../middleware/auth');
var api = express.Router();

api.post('/', [auth],  asyncMiddleware(addExamen));
api.put('/', [auth],  asyncMiddleware(updExamen));
api.get('/:id?', [auth], asyncMiddleware(getExamen));
api.delete('/:id/:user', [auth], asyncMiddleware(delExamen));

module.exports = api;