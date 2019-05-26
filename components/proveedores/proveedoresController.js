'use strict';

const Proveedores = require('./proveedores');
const status = require('../enums/status.enums');

async function get(req, res){

    const id = req.params.id;
    let result;

    if(id){
        result = await Proveedores.findById(id);
    }else{
        result = await Proveedores.find({'status' : status.active}).sort('name');
    }

    res.status(200).send({
        result 
    });
}

async function add(req, res){
    let proveedores = new Proveedores(req.body);
    let result = proveedores.save();

    res.status(200).send({
        result 
    });
}

async function update(req, res){
    let result = Proveedores.findOneAndUpdate(req.body._id, 
        req.body
    );


    res.status(200).send({
        result 
    });
}

async function remove(req, res){    
    let result = Proveedores.findOneAndUpdate(req.params.id, {
        status : status.noactive
    });

    res.status(200).send({
        result 
    });
}
  
module.exports.get = get;
module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;