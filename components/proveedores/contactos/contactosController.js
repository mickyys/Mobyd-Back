'use strict';

const Proveedores = require('../proveedores');
const status = require('../../enums/status.enums');

async function add(req, res){
    
    let result = await Proveedores.findOneAndUpdate(
        { _id : req.params.id},
        { $push : { contacts : req.body.contact }}
    );

    res.status(200).send({
        result 
    });
}

module.exports.addContact = add;