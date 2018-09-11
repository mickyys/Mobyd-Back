'use strict'

var Comuna = require('./comuna');

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

module.exports = {
    getComunas
}