const { getTipoDocumentos, getTipoPagos, addTipoPagos, addTipoDocumentos, addTipoProducto, getTipoProductos, updTipoProducto, delTipoProducto} = require('./tipoController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/documents', [auth], asyncMiddleware(getTipoDocumentos));
api.get('/payments', [auth], asyncMiddleware(getTipoPagos));
api.post('/documents', [auth], asyncMiddleware(addTipoDocumentos));
api.post('/payments', [auth], asyncMiddleware(addTipoPagos));
api.get('/products', [auth], asyncMiddleware(getTipoProductos));
api.post('/products', [auth], asyncMiddleware(addTipoProducto));
api.put('/products', [auth], asyncMiddleware(updTipoProducto));
api.delete('/products/:id/:user', [auth], asyncMiddleware(delTipoProducto));


module.exports = api;