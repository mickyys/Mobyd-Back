'use strict'

const PacienteInformeMedico = require('./pacienteInformeMedico');
const Status = require('../enums/status.enums');

async function save(req, res){
    const pacienteInformeMedico = PacienteInformeMedico(req.body);
    const result = await pacienteInformeMedico.save();           
    res.status(200).send({ result });
}

async function update(req, res){
    const result = await PacienteInformeMedico.findByIdAndUpdate(req.body.id, req.body);           
    res.status(200).send({ result });
}

async function get(req, res){
    let id = req.params.id;    
    let paciente = req.params.paciente;
    let result;
    if (id) {
        result = await PacienteInformeMedico.findById(id); 
    }else{
        result = await PacienteInformeMedico.find({'status': Status.active, 'paciente' : paciente});
    }
    res.status(200).send({ result });
}

async function remove(req, res){
    const result = await PacienteInformeMedico.findByIdAndUpdate(req.params.id, {$set: { status: Status.noactive }});           
    res.status(200).send({ result });
}

module.exports.save = save;
module.exports.update = update;
module.exports.get = get;
module.exports.remove = remove;
