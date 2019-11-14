'use strict';

const express = require('express');
const {getInformeMedico, delInformeMedico , updInformeMedico, addInformeMedico} = require('./informeMedicoController');
const asyncMiddleware = require("../../middleware/async");
const auth = require('../../middleware/auth');
const api = express.Router({mergeParams: true});

api.put('/', [auth], asyncMiddleware(async(req,res) =>{
    let result = await updInformeMedico(req.body)
    res.status(200).send({
        result
    });
}));

api.post('/', [auth], asyncMiddleware(async(req,res) =>{
    let result = await addInformeMedico(req.body)
    res.status(200).send({
        result
    });
}));

api.get('/:informe?', [auth], asyncMiddleware(async(req, res) =>{
    let result = await getInformeMedico(req.params.informe, req.params.id);
    res.status(200).send({
        informesMedicos : result
    });
}));
api.delete('/:informe', [auth], asyncMiddleware(async(req,res) => {
    let result =  await delInformeMedico(req.params.informe);
    res.status(200).send({
        result
    });
}));

module.exports = api;