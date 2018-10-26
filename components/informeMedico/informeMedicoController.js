'use strict'

const InformeMedico = require('./informeMedico')
const Status = require('../enums/status.enums')

async function addInformeMedico(req, res){
    try{
        const informeMedico = new InformeMedico(req.body);
        const result = await informeMedico.save();

        res.status(200).send({
            result
        });

    }catch(ex){
        res.status(500).send({
            message: 'Error al guardar el informe medico',
            err : ex.message
        });
    }
}

async function getInformeMedico(req, res){
    try{

        let result;

        if(req.params.id){
           result = await InformeMedico
            .findById(req.params.id, )
            .sort('descripcion');
        }
        else{
           result = await InformeMedico
            .find({'status' : Status.active})
            .sort('descripcion');
        }

        res.status(200).send({
            informesMedicos : result
        });

    }catch(ex){
        res.status(500).send({
            message: 'Error al obtener informe medico',
            err : ex.message
        });
    }
}

async function updInformeMedico(req, res){
    try{
        const result = await InformeMedico.findByIdAndUpdate(req.body._id,{$set:req.body});

        res.status(200).send({
            result
        });

    }catch(ex){
        res.status(500).send({
            message: 'Error al guardar el informe medico',
            err : ex.message
        });
    }
}

async function delInformeMedico(req, res){
    try{
        const result = await InformeMedico.findByIdAndUpdate(req.params.id, {
            $set : { status : Status.noactive }
        });

        res.status(200).send({
            result : result
        });

    }catch(ex){
        res.status(500).send({
            message: 'Error al guardar el informe medico',
            err : ex.message
        });
    }
}

module.exports = {
    addInformeMedico,
    getInformeMedico,
    updInformeMedico,
    delInformeMedico
}