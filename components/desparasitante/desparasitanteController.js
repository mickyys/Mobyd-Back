'use strict';
const Desparasitante = require('./desparasitante');
const Servicio = require('./servicio');

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

async function getDesparasitante(req, res) {

    const result = await Desparasitante.find({
        'status': Status.active
    });

    res.status(200).send({
        desparasitantes: result
    });

}

module.exports = {
    getDesparasitante,
    saveDesparasitante,
    saveServicio,
    getServicio
}