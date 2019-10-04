'use strict';

const Proveedores = require('../proveedores');
const Product = require('../../products/productsController');
const status = require('../../enums/status.enums');

async function add(id, document){   
    let result = await Proveedores.findOneAndUpdate(
        { _id : id},
        { $push : { documents : document }},
        { new : true }
    );
    
    document.products.forEach(async (data) =>{
        await Product.addOrUpdateNewProductForName(data.name, data.qty, data.price, data.priceTax, data.type, data.user);
    });
    
    return result;
}

async function get(req, res){

    let result = await Proveedores.find(
        {'documents._id': req.params.id }, 
        {'documents.$': 1 }
    ).populate('documents.products.type')
    .sort({
        'expirateDate' : -1        
    });
      
    res.status(200).send({
        result 
    });
}

async function remove(req, res){

    let result = await Proveedores.update(
        { },
        { $pull : { documents : { _id : req.params.id} }},
        { 
            'multi' : true, 
            'upsert' : false
        }
    );

    res.status(200).send({
        result 
    });

}

module.exports.addDocument = add;
module.exports.getDocument = get;
module.exports.removeDocument = remove;