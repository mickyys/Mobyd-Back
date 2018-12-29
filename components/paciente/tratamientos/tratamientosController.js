'use strict';
const Joi = require('joi');
const Tratamiento = require('./tratamientos');
var Enum = require('enum');


async function save(req, res) {
    const tratamientos = new Tratamiento(req.body);
    const result = await tratamientos.save();
    res.status(200).send({
        tratamiento: result
    });
}

async function get(req, res) {
    const id = req.params.id;
    if (id) {
        let result = await Tratamiento.find({
                paciente: id,
                status: Status.active
            }).populate('servicesdesparasitantes')
             .populate('vacuna')
             .populate('desparasitante')
             .exec();
            

        res.status(200).send({
            tratamientos: result,
        });

    } else {
        let result = await Tratamiento.find({
            'status': Status.active
        }).populate('servicesdesparasitantes')
        .populate('vacunas')
        .populate('desparasitante')
        .exec();

        res.status(200).send({
            tratamientos: result
        });
    }
}

async function remove(req, res) {
    const id = req.params.tratamiento;
    const result = await Tratamiento.findByIdAndUpdate({
            _id: id
        },
        $set = {
            status: Status.noActive
        });

    res.send({
        tratamientos: result
    });
}

module.exports = {
    save,
    get,
    remove
}