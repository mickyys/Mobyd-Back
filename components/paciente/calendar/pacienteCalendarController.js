'use strict'

const PacienteCalendar = require('./pacienteCalendar');
const Status = require('../../enums/status.enums');

async function save(req, res){
    const pacienteCalendar = PacienteCalendar(req.body);
    const result = await pacienteCalendar.save();           
    res.status(200).send({ result });
}

async function update(req, res){+
    console.log(req.body);
    const result = await PacienteCalendar.findByIdAndUpdate(req.body._id, req.body);           
    res.status(200).send({ result });
}

async function get(req, res){

    console.log('getpacienteee');
    

    // let paciente = req.params.paciente;
    // let result;
    // if (paciente) {
    //     result = await PacienteCalendar.find({'status': Status.active, 'paciente' : paciente});
    // }else{
       let result = await PacienteCalendar.find({'status': Status.active});
    // }
    res.status(200).send({ result });
}

async function remove(req, res){
    const result = await PacienteCalendar.findByIdAndUpdate(req.params.id, {$set: { status: Status.noactive }});           
    res.status(200).send({ result });
}

module.exports.save = save;
module.exports.update = update;
module.exports.get = get;
module.exports.remove = remove;