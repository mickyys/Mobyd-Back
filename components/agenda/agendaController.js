'use strict'
const Joi = require('joi');
const Agenda = require('./agenda');

function saveAgenda(req, res){

    const SchemaValidate = {
        fecha : Joi.date().required().label('Fecha es obligatoria'),
        hora : Joi.required().label('Hora es obligatoria'),
        informacion : Joi.string().min(3).required().label('Informacion es obligatorio'),
        paciente : Joi.optional()

    }

    Joi.validate(req.body, SchemaValidate, (err, data) => {
        if (err) {
            res.status(500).send({
                error: err.details[0].context.label
            });
        } else {
            var agendas = new Agenda(req.body);
            agendas.save((err, data) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al guardar agenda'
                    });
                } else {
                    res.status(200).send({
                        agenda: data
                    });
                }
            });
        }

    });
}


module.exports = {
    saveAgenda
}