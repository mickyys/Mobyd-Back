'use strict';

var express = require('express');
var tutor = require('./tutorsController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.get('/:id?', [auth], asyncMiddleware(tutor.getTutor));
api.get('/rut/:rut', [auth], asyncMiddleware(tutor.getTutorRut));
api.post('/', [auth], asyncMiddleware(tutor.saveTutor));
api.put('/', [auth], asyncMiddleware(tutor.updTutor));
api.delete('/:id/:user', [auth], asyncMiddleware(tutor.delTutor));

module.exports = api;