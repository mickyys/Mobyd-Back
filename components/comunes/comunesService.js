'user strict'

var express = require('express');
var comunes = require('./comunesController');
var api = express.Router();

api.get('/comunas', comunes.getComunas);

module.exports = api;