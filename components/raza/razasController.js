'use strict'

var Raza = require('./raza');

/**
 * Retorna información de todas las razas
 * @param req The request contiene el ID enviado en la URL
 * @param res The response retorna estado y pacientes en formato rest
 */
function getRazas(req, res) {
    Raza.find({}).sort('raza').exec((err, razas) => {
        if (err) {
            res.status(500).send({
                message: 'Error en servidor'
            });
        }

        if (!razas) {
            res.status(404).send({
                message: 'No hay razas'
            });
        }

        res.status(200).send({
            razas
        });
    });
}

module.exports = {
    getRazas
}