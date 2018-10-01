'user strict'

var express = require('express');
var tutor = require('./tutorsController');
var api = express.Router();

api.get('/:id?', tutor.getTutor);
api.get('/rut/:rut', tutor.getTutorRut);
api.post('/', tutor.saveTutor);
api.put('/', tutor.updTutor);
api.delete('/:id/:user', tutor.delTutor);

module.exports = api;