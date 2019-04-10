'use strict';

const proveedores = require('./proveedores');
const status = require('../enums/status.enums');

async function get(req, res){

    const id = req.params.id;
    let result;

    if(id){
        result = await proveedores.findById(id);
    }else{
        result = await proveedores.find({'status' : status.active}).sort('name');
    }

    res.status(200).send({
        result 
    });
}
  
module.exports.get = get;