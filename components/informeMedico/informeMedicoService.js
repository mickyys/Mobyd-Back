'user strict'

var express = require('express');
var informe = require('./informeMedicoController');
var api = express.Router();

api.put('/', informe.updInformeMedico);
api.post('/', informe.addInformeMedico);
api.get('/:id?', informe.getInformeMedico);
api.delete('/:id', informe.delInformeMedico);

module.exports = api;