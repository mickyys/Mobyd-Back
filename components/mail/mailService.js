'use strict';

const express = require('express');
const { get } = require('./mailController');
const api = express.Router();

api.get('/', get);

module.exports = api;