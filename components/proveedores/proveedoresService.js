const { get, add, update, remove } = require('./proveedoresController');
const { addContact, removeContact } = require('./contactos/contactosController');
const { addDocument, getDocument, removeDocument } = require('./documentos/documentosController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/:id?', [auth], asyncMiddleware(get));
api.delete('/:id', [auth], asyncMiddleware(remove));

api.post('/', [auth], asyncMiddleware(async (req, res) =>{   
    let result = await add(req.body);   
    res.status(200).send({
        result 
    });
}));

api.put('/', [auth], asyncMiddleware(update));

api.post('/:id/contact', [auth], asyncMiddleware(addContact));
api.delete('/contact/:id', [auth], asyncMiddleware(removeContact));
api.get('/document/:id', [auth], asyncMiddleware(getDocument));
api.delete('/document/:id', [auth], asyncMiddleware(removeDocument));


api.post('/:id/document', [auth], asyncMiddleware(async(req , res) => {   
    let result = await addDocument(req.params.id, req.body.document);    
    res.status(200).send({
        result 
    });
}));

module.exports = api;