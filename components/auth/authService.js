'use strict';

var express = require('express');
var { auth } = require('./authController');
const passport = require('passport');
const { googleCallback, initialize } = require('./google/oauth')
var api = express.Router();

api.post('/', auth);
api.use(initialize);
api.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
api.get('/google/callback',  passport.authenticate('google'), googleCallback);

module.exports = api;