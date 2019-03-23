'use strict';
const Desparasitante = require('./desparasitante');
const Servicio = require('./servicio');
const  moment = require('moment-timezone');

async function saveServicio(req, res) {
    const servicio = new Servicio(req.body);
    const result = await servicio.save();

    res.status(200).send({
        servicios: result
    });
}


async function getServicio(req, res) {
    const result = await Servicio.find({
        'status': Status.active
    });
    res.status(200).send({
        servicios: result
    });

}

async function saveDesparasitante(req, res) {
    const desparasitante = new Desparasitante(req.body);
    const result = await desparasitante.save();

    res.status(200).send({
        desparasitante: result
    });

}

async function updateDesparasitante (req, res) {
    const result = await Desparasitante.findByIdAndUpdate({_id : req.body._id}, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}


async function removeDesparasitante(req, res) {
    const result = await Desparasitante.findOneAndUpdate({ _id : req.params.id},{
        $set : { 
            status : Status.noactive, 
            userModify : { name : req.params.user },
            dateModify : moment().tz("America/Santiago").format()
        }
    });

    res.status(200).send({
        result
    });
}

async function getDesparasitante(req, res) {

    const result = await Desparasitante.find({
        'status': Status.active
    }).sort('descripcion');

    res.status(200).send({
        desparasitantes: result
    });

}

module.exports = {
    getDesparasitante,
    saveDesparasitante,
    updateDesparasitante,
    removeDesparasitante,
    saveServicio,
    getServicio
}