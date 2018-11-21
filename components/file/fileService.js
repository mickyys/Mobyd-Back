'use strict';

var express = require('express');
var { downloadFile, getFiles, saveFile } = require('./fileController');
const asyncMiddleware = require("../middleware/async");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var api = express.Router();

api.get('/download/:id', asyncMiddleware(downloadFile));
api.get('/', asyncMiddleware(getFiles));
api.post('/', multipartMiddleware, asyncMiddleware(saveFile));

module.exports = api;