'use strict';

const Historial = require('./historial');

module.exports.add = async (req, res) => {
    const historial = new Historial(req.body);
    const result = await historial.save();

    res.status(200).send({
        result
    });
}


module.exports.get = async (req, res) => {

    let result;

    if (req.params.idHistorial) {
        result = await Historial
            .findById({_id : req.params.idHistorial}, )
            .sort('descripcion');
    } else {
        result = await Historial
            .find({
                'patient' : req.params.id,
                'status': Status.active
            })
            .sort('descripcion');
    }
    
    res.status(200).send({
         result
    });
}