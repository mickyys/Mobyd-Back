'use strict';

const express = require('express');
const { getDoctors } = require('./medicosController');
const auth = require('../middleware/auth');
const api = express.Router();

api.get('/', [auth], getDoctors);

module.exports = api;