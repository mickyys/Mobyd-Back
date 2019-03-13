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
async function getComunas(req, res) {

    let result = await Comuna.find({}).sort('descripcion');
        res.status(200).send({
            comunas: result
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
async function getVacunas(req, res) {
    if (req.params.laboratorio) {
        let result = await Vacunas.find({'laboratorio': req.params.laboratorio, 'status' : Status.active})
                                  .populate('laboratorio')
                                  .sort('descripcion');
        res.status(200).send({
            vacunas: result
        });

    } else {
        let result = await Vacunas.find({'status' : Status.active})
                                  .populate('laboratorio')
                                  .sort('descripcion');
        res.status(200).send({
            vacunas: result
        });
    }
}

/**
 * Guarda nuevas vacunas asociadas a los laboratorios existentes
 * @param {*} req The request information
 * @param {*} res The response information 
 */
async function addVacunas(req, res) {
    
    const vacunas = new Vacunas(req.body);
    const result = await vacunas.save();
            
    res.status(200).send({
         vacuna: result
    });
}

async function updateVacunas (req, res) {
    const result = await Vacunas.findByIdAndUpdate({_id : req.body._id}, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}


async function deleteVacunas(req, res) {
    const vacunas = await Vacunas.findOneAndUpdate({ _id : req.params.id},{
        $set : { 
            status : Status.noactive 
        }
    });

    res.status(200).send({
        vacunas: vacunas
    });
}

function getMucosas(req, res) {
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
    try {
        const result = await mucosas.save();
        res.status(200).send({
            mucosa: result
        });

    } catch (ex) {
        res.status(500).send({
            message: 'Error al guardar la mucosas',
            err: ex.message
        });
    }
}

module.exports = {
    getComunas,
    getLaboratorios,
    addLaboratorios,
    getVacunas,
    addVacunas,
    deleteVacunas,
    updateVacunas,
    getMucosas,
    addMucosas
}