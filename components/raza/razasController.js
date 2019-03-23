'use strict';

const Raza = require('./raza');
const  moment = require('moment-timezone');

/**
 * Retorna información de todas las razas
 * @param req The request contiene el ID enviado en la URL
 * @param res The response retorna estado y pacientes en formato rest
 */
async function get(req, res) {
    const razas = await Raza.find({}).sort('raza');
    
    res.status(200).send({
        razas
    });

}

async function add(req, res) {
    const raza = new Raza(req.body);
    const result = await raza.save();

    res.status(200).send({
        raza: result
    });
}

async function update (req, res) {
    const result = await Raza.findByIdAndUpdate({_id : req.body._id}, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}


async function remove(req, res) {
    const raza = await Raza.findOneAndUpdate({ _id : req.params.id},{
        $set : { 
            status : Status.noactive, 
            userModify : { name : req.params.user } ,
            dateModify : moment().tz("America/Santiago").format()
        }
    });

    res.status(200).send({
        raza
    });
}

module.exports = {
    get,
    add,
    update,
    remove
}