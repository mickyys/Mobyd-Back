const { getTipoDocumentos, getTipoPagos, addTipoPagos, addTipoDocumentos } = require('./tipoController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/documents', [auth], asyncMiddleware(getTipoDocumentos));
api.get('/payments', [auth], asyncMiddleware(getTipoPagos));
api.post('/documents', [auth], asyncMiddleware(addTipoDocumentos));
api.post('/payments', [auth], asyncMiddleware(addTipoPagos));

module.exports = api;