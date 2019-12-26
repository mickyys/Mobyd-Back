'use strict';

const express = require('express');
const ordersController = require('./ordersController');
const asyncMiddleware = require("../middleware/async");
const auth = require('../middleware/auth');
const api = express.Router({mergeParams: true});

api.get('/:status/:datestart/:dateend', [auth], asyncMiddleware(async(req,res) =>{
    let result = await ordersController.getOrders(req.params.status, req.params.datestart, req.params.dateend);
    res.status(200).send({
        result
    });
}));

api.get('/withPayment/date/:datestart/:dateend', [auth], asyncMiddleware(async(req,res) =>{
    let result = await ordersController.getOrdersForPaymentDate(req.params.datestart, req.params.dateend);
    
    res.status(200).send({
        result
    });
}));

//byId
api.get('/byId/:id?', [auth], asyncMiddleware(async(req,res) =>{
    let result = await ordersController.getOrderById(req.params.id);
    res.status(200).send({
        result
    });
}));


api.post('/withPayment', auth, asyncMiddleware( async(req,res)=>{
    let result = await ordersController.addOrderWithPayment(req.body.order, req.body.tutor, req.body.paciente, req.body.products, req.body.services, req.body.price, 0, req.body.price, req.body.doctor, req.body.user, req.body.payment);
    res.status(200).send({
        result
    });
}));

api.put('/payment',  auth, asyncMiddleware(async(req,res) =>{
    let result = await ordersController.updPayment(req.body._id, req.body.order.status, req.body.payment);
    res.status(200).send({
        result
    });
}));

api.put('/paymentAll',  auth, asyncMiddleware(async(req,res) =>{
    let result = await ordersController.updPaymentAll(req.body._id, req.body.order.status, req.body.payment, req.body.products, req.body.services);
    res.status(200).send({
        result
    });
}));

module.exports = api;