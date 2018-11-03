'use strict';

var express = require('express');
var comunes = require('./comunesController');
var api = express.Router();

api.get('/comunas', comunes.getComunas);
api.get('/laboratorios', comunes.getLaboratorios);
api.get('/laboratorios/:vacuna?', comunes.getLaboratorios);
api.post('/laboratorios', comunes.addLaboratorios);
api.get('/vacunas/:laboratorio?', comunes.getVacunas);
api.post('/vacunas', comunes.addVacunas);
api.get('/mucosas', comunes.getMucosas)
api.post('/mucosas', comunes.addMucosas)

module.exports = api;