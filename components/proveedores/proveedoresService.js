const { get, add, update, remove } = require('./proveedoresController');
const { addContact } = require('./contactos/contactosController');
const { addDocument, getDocument } = require('./documentos/documentosController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/:id?', [auth], asyncMiddleware(get));
api.delete('/:id', [auth], asyncMiddleware(remove));
api.post('/', [auth], asyncMiddleware(add));
api.put('/', [auth], asyncMiddleware(update));

api.post('/:id/contact', [auth], asyncMiddleware(addContact));
api.post('/:id/document', [auth], asyncMiddleware(addDocument));
api.get('/document/:id', [auth], asyncMiddleware(getDocument));
module.exports = api;