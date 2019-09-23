'use strict';

const Tax = require('./tax');
const status = require('../enums/status.enums');

async function get(req, res){

    const id = req.params.id;
    let result;

    if(id){
        result = await Tax.findById(id);
    }else{
        result = await Tax.find({'status' : status.active}).sort('description');
    }

    res.status(200).send({
        result
    });
}

async function add(req, res){
    let tax = new Tax(req.body);
    let result = await tax.save();

    res.status(200).send({
        result 
    });
}

async function update(req, res){
    let result = await Tax.findOneAndUpdate(
         { _id : req.body._id}, 
         {
            description : req.body.description,
            value : req.body.value,
            modify : {
                user : req.body.modify.user,
                date : req.body.modify.date
            }
         },
         { new: true }
    );

    res.status(200).send({
        result
    });
}

async function remove(req, res){    
    let result = await Tax.findOneAndUpdate(req.params.id, {
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