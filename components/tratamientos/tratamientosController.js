'use strict'
const Joi = require('joi');
const Tratamiento = require('./tratamientos');
var Enum = require('enum');

var status = new Enum({
    'active': 1,
    'noActive': 0
});

function saveTratamiento(req, res){

    const SchemaValidate = {
        fecha : Joi.date().required().label('Fecha es obligatoria'),
        hora : Joi.required().label('Hora es obligatoria'),
        precio : Joi.required().label('Precio es obligatoria'),
        vacuna : Joi.optional(),
        servicio : Joi.optional(),
        desparasitante : Joi.optional(),
        ectoparasitos : Joi.optional(),
        comentario : Joi.required().label('Comentario es obligatoria'),        
        paciente : Joi.optional(),       
        tipo : Joi.required().label('Tipo es obligatoria')
    }

    Joi.validate(req.body, SchemaValidate, (err, data) => {
        if (err) {
            res.status(500).send({
                error: err.details[0].context.label
            });
        } else {
            var tratamientos = new Tratamiento(req.body);
            tratamientos.save((err, data) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al guardar tratamiento'
                    });
                } else {
                    res.status(200).send({
                        tratamiento: data
                    });
                }
            });
        }

    });
}

function getTratamiento(req, res){
    var id = req.params.id;    
    console.log(id);
    if (id) {
        Tratamiento.findById(id, (err, tratamiento) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en servidor al obtener el tutor'
                });
            }

            if (!tratamiento) {
                res.status(404).send({
                    message: 'No existe tratamiento'
                });
            }else{
                res.status(200).send({
                    tratamiento
                });
            }
        });
    } else {
        Tratamiento.find({
            'status': status.getValue('active')
        }, (err, tratamiento) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en servidor'
                });
            }

            if (!tratamiento) {
                res.status(404).send({
                    message: 'No hay tratamiento'
                });
            }
            else{
                res.status(200).send({
                    tratamientos : tratamiento
                });
            }            
        });
    }
}


module.exports = {
    saveTratamiento,
    getTratamiento        
}