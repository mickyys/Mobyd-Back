'use strict';

const express = require('express');
const { getUserMe , getUsers, addUser, update, changePassword } = require('./userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const api = express.Router();

api.get('/me', [auth], getUserMe);
api.get('/', [auth],getUsers);
api.post('/', [auth], addUser);
api.put('/',[auth], update)
api.put('/changePassword', [auth], changePassword);

module.exports = api;