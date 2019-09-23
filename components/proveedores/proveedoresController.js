'use strict';

const Proveedores = require('./proveedores');
const Product = require('../products/productsController');
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

async function add(proveedor){   
        let proveedores = new Proveedores(proveedor);
        let result = await proveedores.save();
    
        if(req.body.documents){
            let document = req.body.documents;
            await document.products.forEach(async (data) =>{
                    await Product.addOrUpdateNewProductForName(data.name, data.qty, data.price, data.type, data.user);
            });
        };
        return result;
}

async function update(req, res){
    let result = await Proveedores.update({ _id : req.body._id}, 
        {
            rut : req.body.rut,
            name : req.body.name,
            location : req.body.location,
            fono : req.body.fono,
            email : req.body.email
         },
         { new: true },
    );

    res.status(200).send({
        result
    });
}

async function remove(req, res){    
    let result = await Proveedores.findOneAndUpdate({_id : req.params.id}, {
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