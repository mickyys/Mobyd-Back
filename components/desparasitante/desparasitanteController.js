'use strict'
const Joi = require('joi');
const Desparasitante = require('./desparasitante');
const Servicio = require('./servicio');
var Enum = require('enum');

var status = new Enum({
    'active': 1,
    'noActive': 0
});

function saveServicio(req, res){
    const SchemaValidate = {
        tamano : Joi.string().required().label('Tamaño es obligatorio'),
        factor : Joi.number().required().label('Factor es obligatorio')
    }

    Joi.validate(req.body, SchemaValidate, (err, data) => {
        if (err) {
            res.status(500).send({
                error: err.details[0].context.label
            });
        } else {
            var servicio = new Servicio(req.body);
            servicio.save((err, data) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al guardar servicio'
                    });
                } else {
                    res.status(200).send({
                        servicio: data
                    });
                }
            });
        }

    });
}


function getServicio(req, res){    
    Servicio.find({
        'status': status.getValue('active')
    }, (err, servicio) => {
        if (err) {
            res.status(500).send({
                message: 'Error en servidor'
            });
        }

        if (!servicio) {
            res.status(404).send({
                message: 'No hay servicio'
            });
        }
        else{
            res.status(200).send({
                servicios : servicio
            });
        }            
    });
}

function saveDesparasitante(req, res){
    const SchemaValidate = {
        descripcion : Joi.string().required().label('descripcion es obligatoria'),
        precio : Joi.number().required().label('Precio es obligatorio')
    }

    Joi.validate(req.body, SchemaValidate, (err, data) => {
        if (err) {
            res.status(500).send({
                error: err.details[0].context.label
            });
        } else {
            var desparasitante = new Desparasitante(req.body);
            desparasitante.save((err, data) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al guardar desparasitante'
                    });
                } else {
                    res.status(200).send({
                        desparasitante: data
                    });
                }
            });
        }

    });
}

function getDesparasitante(req, res){
    
    Desparasitante.find({
        'status': status.getValue('active')
    }, (err, desparasitante) => {
        if (err) {
            res.status(500).send({
                message: 'Error en servidor'
            });
        }

        if (!desparasitante) {
            res.status(404).send({
                message: 'No hay desparasitante'
            });
        }
        else{
            res.status(200).send({
                desparasitantes : desparasitante
            });
        }            
    });
}

module.exports = {
    getDesparasitante,
    saveDesparasitante,
    saveServicio,
    getServicio
}