'use strict'

const PacienteExamenLaboratorio = require('./pacienteExamenLaboratorio');
const Status = require('../enums/status.enums');

async function save(req, res){
    const pacienteExamenLaboratorio = PacienteExamenLaboratorio(req.body);
    const result = await pacienteExamenLaboratorio.save();           
    res.status(200).send({ result });
}

async function update(req, res){
    const result = await PacienteExamenLaboratorio.findByIdAndUpdate(req.body.id, req.body);           
    res.status(200).send({ result });
}

async function get(req, res){
    let id = req.params.id;    
    let paciente = req.params.paciente;
    let result;
    if (id) {
        result = await PacienteExamenLaboratorio.findById(id); 
    }else{
        result = await PacienteExamenLaboratorio.find({'status': Status.active, 'paciente' : paciente});
    }
    res.status(200).send({ result });
}

async function remove(req, res){
    const result = await PacienteExamenLaboratorio.findByIdAndUpdate(req.params.id, {$set: { status: Status.noactive }});           
    res.status(200).send({ result });
}

module.exports.save = save;
module.exports.update = update;
module.exports.get = get;
module.exports.remove = remove;
