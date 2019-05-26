'use strict';

const express = require('express');
const { get, getMailgun } = require('./mailController');
const api = express.Router();

api.get('/', get);
api.get('/gun', getMailgun);

module.exports = api;