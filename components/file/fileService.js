'use strict';

var express = require('express');
var { downloadFile } = require('./fileController');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.get('/download/:id', asyncMiddleware(downloadFile));

module.exports = api;