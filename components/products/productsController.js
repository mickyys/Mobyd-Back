'use strict';

const Products = require('./products');
const status = require('../enums/status.enums');

async function get(id){
    if(id){
       return await Products.findById(id).populate('type');
    }else{
       return await Products.find({'status' : status.active }).populate('type').sort('name');
    }
}

const addOrUpdateNewProductForName = async (name, qty, price, type, user) => {    
    
    let product = await this.getName(name);
    let result;

    if(product){
        product.qty += Number(qty);
        product.type = type;  
        product.modify = {
            user : user,
            date : new Date()
        }
            
        if(product.price < price){
            product.price = price;
        }   
                
        result = await this.update(product.id, product.name, product.barcode, product.qty, product.qtyMin, product.price, product.type, product.user);

    }else
    {
        let product = new Products({
            name : name,
            qty : qty,
            type : type,
            price : price,   
            create : {
                user : user,
                date : new Date()
            }                 
        });
        
        result = await this.add(product);
    }

    return result;       
}

const getName = async (name) =>  {
    let product = await Products.findOne({ 'status' : status.active, 'name' : name.toUpperCase() });  
    return product;
}

const getNameLike = async (name) => {
    let result = await Products.find({'status' : status.active, 'status': Status.active,
                                        $or : [
                                            {'name' : new RegExp('^'+ name.toUpperCase(), "i")}
                                        ]
                                    }).sort('name');   

   return result;
}

const existsProduct = async (name) => {
    let exists = await getName(name);
    return (exists) ? true : false; 
}

async function add(product){

    let exists = await existsProduct(product.name);   
    if(exists){       
        throw new Error('Producto ya existe'); 
    } 

    let products = new Products(product);
    return await products.save();    
}

async function update(id, name, barcode, qty, qtyMin, price, type, modify){
    let result = await Products.findOneAndUpdate({ _id : id}, 
        {
            name : name,
            barcode : barcode,
            qty : qty,
            qtyMin : qtyMin,
            price : price,
            type : type,
            modify :{
                user : modify.user,
                date : modify.date
            }
        },
        { new: true }
    ).populate('type');    
      
    return result;    
}

async function remove(id){    
    console.log(id);
    let result = await Products.findOneAndUpdate({ _id : id}, {
        status : status.noactive
    });

    return result;
}

const discountAdd = async (id, discount) => {       
    let result = await Products.findOneAndUpdate(
        { _id : id },
        { $push : { 'discount' : discount }},
        { new : true }
    );
    
    return result;    
}

const discountDelete = async (id) => {      
    let result = await Products.findOneAndUpdate(
        { },
        { $pull : { 'discount' : { _id : id} }},
        { multi : true, upsert : false,  new : true }
    );
    
    return result;    
}

module.exports.get = get;
module.exports.getNameLike = getNameLike;
module.exports.getName = getName;
module.exports.add = add;
module.exports.update = update;
module.exports.addOrUpdateNewProductForName = addOrUpdateNewProductForName;
module.exports.remove = remove;
module.exports.discountAdd = discountAdd;
module.exports.discountDelete = discountDelete;