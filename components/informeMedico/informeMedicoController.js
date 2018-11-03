'use strict';

const InformeMedico = require('./informeMedico')
const Status = require('../enums/status.enums')

module.exports.addInformeMedico = async (req, res) => {
    const informeMedico = new InformeMedico(req.body);
    const result = await informeMedico.save();

    res.status(200).send({
        result
    });
}

module.exports.getInformeMedico = async (req, res) => {

    let result;

    if (req.params.id) {
        result = await InformeMedico
            .findById(req.params.id, )
            .sort('descripcion');
    } else {
        result = await InformeMedico
            .find({
                'status': Status.active
            })
            .sort('descripcion');
    }
    
    res.status(200).send({
        informesMedicos: result
    });
}

module.exports.updInformeMedico = async (req, res) => {
    const result = await InformeMedico.findByIdAndUpdate(req.body._id, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}

module.exports.delInformeMedico = async (req, res) => {

    const result = await InformeMedico.findByIdAndUpdate(req.params.id, {
        $set: {
            status: Status.noactive
        }
    });

    res.status(200).send({
        result: result
    });
}