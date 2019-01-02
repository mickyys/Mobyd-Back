'use strict';

const express = require('express');
const { update, save, remove, get} = require('./serviciosController');
const asyncMiddleware = require("../../middleware/async");
const auth = require('../../middleware/auth');
const api = express.Router({mergeParams: true});

api.put('/', [auth], asyncMiddleware(update));
api.post('/', [auth], asyncMiddleware(save));
api.get('/', [auth], asyncMiddleware(get));
api.delete('/:service', [auth], asyncMiddleware(remove));

module.exports = api;