'use strict';

const Patient = require('./paciente');
const Status = require('../enums/status.enums');
const columns = 'name number birthDate race.raza sex microchip';

/**
 * Retorna información del paciente si contiene el ID, en caso de no traer retorna todos los pacientes activos
 * @param req The request contiene el ID enviado en la URL
 * @param res The response retorna estado y pacientes en formato rest
 */

async function getPaciente(id){
 
    let result;

    if(id){
        result = await Patient.findById(id).populate('tutor');
    }else{
         result = await Patient.find({'status' : Status.active}, columns)
        .populate('tutor').sort('name');
    }

    return result;
}

async function getPatientForName(name){
    return await Patient.findOne({
        name : name
    });
}

async function getPacienteTutor(req, res){

    const tutor = req.params.tutor;
    const result = await Patient.find({'tutor' : tutor , 'status' : Status.active}, columns).sort('name');

    res.status(200).send({
        result
    });
}

/**
 * Guarda en la bd la información del paciente
 * @param req The request contiene la información del paciente
 * @param res The response retorna información del paciente con un ID unico
 */
async function savePaciente(req, res){    
    
    let number = await Patient.count() + 1;

    const patient = new Patient(req.body);
    patient.number = number;
    
    const result = await patient.save();

    res.status(200).send({
        patient : result
    });
}

/**
 * Actualiza la información del paciente
 * @param req The request contiene la información del paciente
 * @param res The response retorna estado e información modificada.
 */
async function updPaciente(req, res){
    
    const result = await Patient.findByIdAndUpdate({_id : req.body._id}, {
        $set : req.body
    });

    res.status(200).send({
        result
    });
}

/**
 * Elimina logicamente la información del paciente
 * @param req The request contiene id y usuario
 * @param res The response retorna estado y mensaje de confirmación
 */
async function delPaciente(req, res){
    
    const result = await Patient.findOneAndUpdate({ _id : req.params.id},{
                    $set : { 
                        status : Status.noactive 
                    }
    });

    res.status(200).send({
        result
    });
}

const getPacienteNumber = async () => {
    return await Patient.countDocuments() + 1;     
}

module.exports = {
    getPaciente,
    getPacienteTutor,
    savePaciente,
    updPaciente,
    delPaciente,
    getPacienteNumber,
    getPatientForName
}