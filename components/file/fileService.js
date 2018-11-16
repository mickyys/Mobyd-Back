'use strict';

var express = require('express');
var { downloadFile, getFiles, saveFile } = require('./fileController');
const asyncMiddleware = require("../middleware/async");
var api = express.Router();

api.get('/download/:id', asyncMiddleware(downloadFile));
api.get('/', asyncMiddleware(getFiles));
api.post('/', asyncMiddleware(saveFile));

module.exports = api;