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
    let result = await proveedores.save();

    res.status(200).send({
        result 
    });
}

async function update(req, res){
    console.log(req.body)
    let result = await Proveedores.update({ _id : req.body._id}, 
        {
            rut : req.body.rut,
            name : req.body.name,
            location : req.body.location,
            fono : req.body.fono,
            email : req.body.email
         }
    );

    res.status(200).send({
        result
    });
}

async function remove(req, res){    
    let result = await Proveedores.findOneAndUpdate(req.params.id, {
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