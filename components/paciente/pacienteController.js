'use strict'

var Enum = require('enum');
var Patient = require('./paciente');

/**
 * Es un lista de valor para estados
 * Activo 1
 * No activo 0
 */
var status = new Enum({'active': 1, 'noActive': 0});

/**
 * Retorna información del paciente si contiene el ID, en caso de no traer retorna todos los pacientes activos
 * @param req The request contiene el ID enviado en la URL
 * @param res The response retorna estado y pacientes en formato rest
 */

function getPaciente(req, res){

    var id = req.params.id;

    if(id){
        Patient.findById(id,(err,patient) =>{
            if(err){
                res.status(500).send({message : 'Error en servidor al obtener paciente'});
            }

            if(!patient){
                res.status(404).send({message : 'No existe paciente'});
            }
    
            res.status(200).send({patient});

        });
    }else{
        Patient.find({'status' : status.getValue('active')},(err, patients) =>{
            if(err){
                res.status(500).send({message : 'Error en servidor'});
            }
    
            if(!patients){
                res.status(404).send({message : 'No hay paciente'});
            }
    
            res.status(200).send({patients});
        });
    }
}

/**
 * Guarda en la bd la información del paciente
 * @param req The request contiene la información del paciente
 * @param res The response retorna información del paciente con un ID unico
 */
function savePaciente(req, res){    
    var params = req.body;
    
    var patient = new Patient({
        name : params.name,
        species : params.species,
        speciesType : params.speciesType,     
        birthDate : params.birthDate,
        race : params.race,
        raceType : params.raceType,
        sex : params.sex,
        microchip : params.microchip,
        photo : params.photo,
        tutor : params.tutor,
        status : status.getValue('active'),
        observations : params.observations,
        death : status.getValue('noActive'),
        userCreate : params.user,
        userModify : params.user
    });

    patient.save((err, patientStore)=>{
        if(err){
            res.status(500).send({ message : 'Error al guardar el paciente' });
        }
        else{
            res.status(200).send({ patient : patientStore });
        }
    });
}

/**
 * Actualiza la información del paciente
 * @param req The request contiene la información del paciente
 * @param res The response retorna estado e información modificada.
 */
function updPaciente(req, res){

    var params = req.body;
    var id = params._id; 

    Patient.findByIdAndUpdate(id, {$set: {
        name : params.name,
        species : params.species,
        speciesType : params.speciesType,     
        birthDate : params.birthDate,
        race : params.race,
        raceType : params.raceType,
        sex : params.sex,
        microchip : params.microchip,
        photo : params.photo,
        tutor : params.tutor,
        status : params.status,
        observations : params.observations,
        death : params.death,
        userModify : params.user,
        dateModify : Date.now()
    }}
    , (err, patientUpdate) =>{
        if(err){
            res.status(500).send({ message : 'Error al guardar el paciente' });
        }
        else{
            res.status(200).send({ patient : patientUpdate });
        }
    });
}

/**
 * Elimina logicamente la información del paciente
 * @param req The request contiene id y usuario
 * @param res The response retorna estado y mensaje de confirmación
 */
function delPaciente(req, res){
    var id = req.params.id;
    var user = req.params.user;

    Patient.findOneAndUpdate({_id : id}, {
                             $set : { status : status.getValue('noActive'),
                                      userModify : user,
                                      dateModify : Date.now()
                             }}, (err, patientUpdate) =>{
        if(err){
            res.status(500).send({ message : 'Error al eliminar el paciente', err });
        }
        else{
            res.status(200).send({ message : 'Paciente eliminado correctamente' });
        }
    });
}

module.exports = {
    getPaciente,
    savePaciente,
    updPaciente,
    delPaciente
}