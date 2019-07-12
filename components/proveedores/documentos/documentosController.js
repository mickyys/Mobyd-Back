'use strict';

const Proveedores = require('../proveedores');
const status = require('../../enums/status.enums');

async function add(req, res){
    
    let result = await Proveedores.findOneAndUpdate(
        { _id : req.params.id},
        { $push : { documents : req.body.document }}
    );

    res.status(200).send({
        result 
    });
}

async function get(req, res){

    let result = await Proveedores.find(
        {'documents._id': req.params.id }, 
        {'documents.$': 1 }
    );

    res.status(200).send({
        result 
    });
}

module.exports.addDocument = add;
module.exports.getDocument = get;