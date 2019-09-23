const { get, getNameLike, getName, add, update, remove, discountAdd, discountDelete } = require('./productsController');
const auth = require('../middleware/auth');
const asyncMiddleware = require("../middleware/async");
const api = require('express').Router();

api.get('/:id?', [auth], asyncMiddleware(async(req, res) =>{
    let result = await get(req.params.id);
    res.status(200).send({
        result
    });
}));

api.get('/nameLike/:name', [auth], asyncMiddleware(async(req,res) => {
    let result = await getNameLike(req.params.name);
    res.status(200).send({
        result
    });
}));

api.get('/name/:name', [auth], asyncMiddleware(async(req,res) => {
    let result = await getName(req.params.name);
    res.status(200).send({
        result
    });
}));

api.delete('/:id', [auth], asyncMiddleware(async(req, res) =>{
    let result = await remove(req.params.id);
    res.status(200).send({
        result
    });
}));

api.delete('/discount/:id', [auth], asyncMiddleware(async(req,res) => {
    let result = await discountDelete(req.params.id);
    res.status(200).send({
        result
    });
}));

api.post('/', [auth], asyncMiddleware(async(req,res) => {
    let result = await add(req.body);
    res.status(200).send({
        result
    });
}));

api.post('/:id/discount', [auth], asyncMiddleware(async(req,res) => {
    let result = await discountAdd(req.params.id, req.body);
    res.status(200).send({
        result
    });
}));

api.put('/', [auth], asyncMiddleware(async(req, res) => {    
    let body = req.body;
    let result = await update(body._id, body.name, body.barcode, body.qty, body.qtyMin, body.price, body.type, body.modify);
    res.status(200).send({
        result
    });    
}));

module.exports = api;