'use strict';

const { ExamenLaboratorio } = require('./examenLaboratorio')
const Status = require('../../enums/status.enums')
const { addFile } = require('../../file/fileController')

module.exports.save = async (req, res) => {
   
    let examenLaboratorio = new ExamenLaboratorio(req.body);    
    const result = await examenLaboratorio.save();

    res.status(200).send({
        result
    });
}

module.exports.get = async (req, res) => {
    let result;

    if (req.params.examen) {
        result = await ExamenLaboratorio
            .find({ 
                'paciente' : req.params.id,
                '_id' : req.params.examen
            })
            .populate('exam')
            .populate('file');
    } else {
        result = await ExamenLaboratorio
            .find({
                'paciente' : req.params.id,
                'status': Status.active
            })
            .populate('exam')
            //.populate('file')
            .sort('date');
    }
    
    res.status(200).send({
         result
    });
}

module.exports.update = async (req, res) => {
    const result = await ExamenLaboratorio.findByIdAndUpdate(req.body._id, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}

module.exports.remove = async (req, res) => {

    console.log(req.params.id);
    
    const result = await ExamenLaboratorio.findByIdAndUpdate(req.params.id, {
        $set: {
            status: Status.noactive
        }
    });

    res.status(200).send({
        result: result
    });
}

module.exports.removeFile =  async (req, res) => {
    const id = req.params.examen;
    const file = req.params.file;
    
    const result = await ExamenLaboratorio.update({
        _id: id
    },
    {
        $pull: { file: file}
    });

res.send({
    tratamientos: result
});
}

