'use strict';

const Proveedores = require('../proveedores');
const status = require('../../enums/status.enums');

async function add(req, res){
    let result = await Proveedores.findOneAndUpdate(
        { _id : req.params.id},
        { $push : { contacts : req.body.contact }},
        { new : true }
    );

    res.status(200).send({
        result 
    });
}

async function remove(req, res){

    let result = await Proveedores.update(
        { },
        { $pull : { contacts : { _id : req.params.id} }},
        { 
            'multi' : true, 
            'upsert' : false
        }
    );

    res.status(200).send({
        result 
    });

}

module.exports.addContact = add;
module.exports.removeContact = remove;