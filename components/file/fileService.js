'use strict';

var express = require('express');
var { downloadFile, getFiles } = require('./fileController');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.get('/download/:id', asyncMiddleware(downloadFile));
api.get('/', asyncMiddleware(getFiles));

module.exports = api;