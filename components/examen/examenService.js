'use strict';

var express = require('express');
var { addExamen, getExamen } = require('./examenController');
const asyncMiddleware = require("../middleware/async");
const auth = require('../middleware/auth');
var api = express.Router();

api.post('/', [auth],  asyncMiddleware(addExamen));
api.get('/:id?', [auth], asyncMiddleware(getExamen));

module.exports = api;