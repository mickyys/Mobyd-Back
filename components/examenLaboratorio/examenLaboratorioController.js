'use strict';

const { ExamenLaboratorio } = require('./examenLaboratorio')
const Status = require('../enums/status.enums')
const { addFile } = require('../file/fileController')

module.exports.addExamenLaboratorio = async (req, res) => {
   
    let examenLaboratorio = new ExamenLaboratorio(req.body);    

    const result = await examenLaboratorio.save();

    res.status(200).send({
        result
    });
}

module.exports.getExamenLaboratorio = async (req, res) => {
    let result;

    if (req.params.id) {
        result = await ExamenLaboratorio
            .findById(req.params.id)
            .populate('exam')
            .populate('file');
    } else {
        result = await ExamenLaboratorio
            .find({
                'status': Status.active
            })
            .populate('exam')
            // .populate('file')
            .sort('date');
    }
    
    res.status(200).send({
         result
    });
}

module.exports.updExamenLaboratorio = async (req, res) => {
    const result = await ExamenLaboratorio.findByIdAndUpdate(req.body._id, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}

module.exports.delExamenLaboratorio = async (req, res) => {

    const result = await ExamenLaboratorio.findByIdAndUpdate(req.params.id, {
        $set: {
            status: Status.noactive
        }
    });

    res.status(200).send({
        result: result
    });
}

