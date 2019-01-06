'use strict';

const InformeMedico = require('./informeMedico');

module.exports.addInformeMedico = async (req, res) => {
    const informeMedico = new InformeMedico(req.body);
    const result = await informeMedico.save();

    res.status(200).send({
        result
    });
}

module.exports.getInformeMedico = async (req, res) => {

    let result;

    if (req.params.informe) {
        result = await InformeMedico
            .findById({_id : req.params.informe}, )
            .sort('descripcion');
    } else {
        result = await InformeMedico
            .find({
                'paciente' : req.params.id,
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

    const result = await InformeMedico.findByIdAndUpdate({_id : req.params.informe}, {
        $set: {
            status: Status.noactive
        }
    });

    res.status(200).send({
        result: result
    });
}