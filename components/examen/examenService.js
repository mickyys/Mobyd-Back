'use strict';

var express = require('express');
var { addExamen, getExamen } = require('./examenController');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.post('/',  asyncMiddleware(addExamen));
api.get('/:id?', asyncMiddleware(getExamen));

module.exports = api;