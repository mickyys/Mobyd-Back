'use strict';

const express = require('express');
const { getUserMe , getUsers, addUser } = require('./userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const api = express.Router();

api.get('/me', [auth], getUserMe);
api.get('/', getUsers);
api.post('/', addUser);

module.exports = api;