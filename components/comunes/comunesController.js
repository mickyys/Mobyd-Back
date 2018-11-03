'use strict';

const Comuna = require('./comuna');
const Laboratorio = require('./laboratorios');
const Vacunas = require('./vacunas');
const Joi = require('joi');
const Mucosas = require('./mucosas');

/**
 * Retorna información de todas las comunas de chile
 * @param req The request contiene el ID enviado en la URL
 * @param res The response retorna lista de comunas
 */
function getComunas(req, res) {
    Comuna.find({}).sort('descripcion').exec((err, comunas) => {
        if (err) {
            res.status(500).send({
                message: 'Error en servidor'
            });
        }

        if (!comunas) {
            res.status(404).send({
                message: 'No hay comunas'
            });
        }

        res.status(200).send({
            comunas
        });
    });
}

/**
 * Obtiene los laboratorios configurados
 * @param req The request information
 * @param res The response information
 */
function getLaboratorios(req, res) {
    if (req.params.vacuna) {

        Vacunas.findById(req.params.vacuna).exec((err, vacunas) => {

            if (err) {
                res.status(500).send({
                    message: 'Error en servidor'
                });
            }

            if (!vacunas) {
                res.status(404).send({
                    message: 'No hay laboratorios para vacuna'
                });
            }

            Laboratorio.findById({
                '_id': vacunas.laboratorio
            }).exec((err, laboratorios) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error en servidor'
                    });
                }

                if (!laboratorios) {
                    res.status(404).send({
                        message: 'No hay laboratorios'
                    });
                }

                res.status(200).send({
                    laboratorios
                });
            });
        });


    } else {
        Laboratorio.find({}).sort('descripcion').exec((err, laboratorios) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en servidor'
                });
            }

            if (!laboratorios) {
                res.status(404).send({
                    message: 'No hay laboratorios'
                });
            }

            res.status(200).send({
                laboratorios
            });
        });
    }
}

/**
 * Permite guardar nuevos laboratorios
 * @param {*} req The request information
 * @param {*} res The response information
 */
function addLaboratorios(req, res) {

    const SchemaValidate = {
        descripcion: Joi.string().min(3).required().label('Descripcion es obligatoria')
    }

    Joi.validate(req.body, SchemaValidate, (err, data) => {
        if (err) {
            res.status(500).send({
                error: err.details[0].context.label
            });
        } else {
            var laboratorios = new Laboratorio(req.body);
            laboratorios.save((err, laboratorio) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al guardar el laboratorio'
                    });
                } else {
                    res.status(200).send({
                        laboratorio: laboratorio
                    });
                }
            });
        }
    });
}

/**
 * Obtiene listado con las vacunas configuradas
 * @param {*} req The request information
 * @param {*} res The response information 
 */
function getVacunas(req, res) {

    if (req.params.laboratorio) {
        Vacunas.find({
            'laboratorio': req.params.laboratorio
        }).sort('descripcion').exec((err, vacunas) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en servidor'
                });
            }

            if (!vacunas) {
                res.status(404).send({
                    message: 'No hay vacunas'
                });
            }

            res.status(200).send({
                vacunas
            });
        });

    } else {
        Vacunas.find({}).sort('descripcion').exec((err, vacunas) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en servidor'
                });
            }

            if (!vacunas) {
                res.status(404).send({
                    message: 'No hay vacunas'
                });
            }

            res.status(200).send({
                vacunas
            });
        });
    }
}

/**
 * Guarda nuevas vacunas asociadas a los laboratorios existentes
 * @param {*} req The request information
 * @param {*} res The response information 
 */
function addVacunas(req, res) {

    const SchemaValidate = {
        descripcion: Joi.string().min(3).required().label('Descripcion es obligatoria'),
        laboratorio: Joi.string().required().label('ID de laboratorio es obligatoria'),
        precio: Joi.number().integer().min(0).required().label('Precio es obligatorio o mayor a 0')
    }

    Joi.validate(req.body, SchemaValidate, (err, data) => {
        if (err) {
            res.status(500).send({
                error: err.details[0].context.label
            });
        } else {
            const vacunas = new Vacunas(req.body);
            vacunas.save((err, vacuna) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al guardar la vacuna'
                    });
                } else {
                    res.status(200).send({
                        vacuna: vacuna
                    });
                }
            });
        }
    });
}

function getMucosas(req, res){
    Mucosas.find({}).sort('descripcion').exec((err, mucosas) => {
        if (err) {
            res.status(500).send({
                message: 'Error en servidor'
            });
        }

        if (!mucosas) {
            res.status(404).send({
                message: 'No hay mucosas'
            });
        }

        res.status(200).send({
            mucosas
        });
    });
}


async function addMucosas(req, res) {

    const mucosas = new Mucosas(req.body);   
    try{
        const result = await mucosas.save(); 
        res.status(200).send({
            mucosa : result
        });

    }catch(ex){
        res.status(500).send({
            message: 'Error al guardar la mucosas',
            err : ex.message
        });
    }    
}

module.exports = {
    getComunas,
    getLaboratorios,
    addLaboratorios,
    getVacunas,
    addVacunas,
    getMucosas,
    addMucosas
}