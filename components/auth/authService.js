'use strict';

var express = require('express');
var { auth } = require('./authController');
var api = express.Router();

api.post('/', auth);

module.exports = api;