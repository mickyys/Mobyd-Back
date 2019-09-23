'use strict';

const express = require('express');
const { add, update, remove, get} = require('./taxController');
const asyncMiddleware = require("../middleware/async");
const auth = require('../middleware/auth');
const api = express.Router();

api.put('/', [auth], asyncMiddleware(update));
api.post('/', [auth], asyncMiddleware(add));
api.get('/', [auth], asyncMiddleware(get));
api.delete('/:id', [auth], asyncMiddleware(remove));

module.exports = api;