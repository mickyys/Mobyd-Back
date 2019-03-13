'use strict';

var express = require('express');
var comunes = require('./comunesController');
var api = express.Router();
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");

api.get('/comunas', comunes.getComunas);
api.get('/laboratorios', comunes.getLaboratorios);
api.get('/laboratorios/:vacuna?', comunes.getLaboratorios);
api.post('/laboratorios', comunes.addLaboratorios);
api.get('/vacunas/:laboratorio?',[auth], asyncMiddleware(comunes.getVacunas));
api.post('/vacunas', [auth], asyncMiddleware(comunes.addVacunas));
api.put('/vacunas', [auth], asyncMiddleware(comunes.updateVacunas));
api.delete('/vacunas/:id', [auth], asyncMiddleware(comunes.deleteVacunas));
api.get('/mucosas', comunes.getMucosas)
api.post('/mucosas', comunes.addMucosas)

module.exports = api;