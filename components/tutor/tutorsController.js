'use strict'

var Tutor = require('./tutor');


var Enum = require('enum');
/**
 * Es un lista de valor para estados
 * Activo 1
 * No activo 0
 */
var status = new Enum({'active': 1, 'noActive': 0});


/**
 * Retorna información del tutor si contiene el ID, en caso de no traer retorna todos los pacientes activos
 * @param req The request contiene el ID enviado en la URL
 * @param res The response retorna estado y pacientes en formato rest
 */
function getTutor(req, res){
    var id = req.params.id;

    if(id){
        Tutor.findById(id,(err,tutor) =>{
            if(err){
                res.status(500).send({message : 'Error en servidor al obtener el tutor'});
            }

            if(!tutor){
                res.status(404).send({message : 'No existe tutor'});
            }
    
            res.status(200).send({tutor});

        });
    }else{
        Tutor.find({'status' : status.getValue('active')},(err, tutors) =>{
            if(err){
                res.status(500).send({message : 'Error en servidor'});
            }
    
            if(!tutors){
                res.status(404).send({message : 'No hay tutores'});
            }
    
            res.status(200).send({tutors});
        });
    }

}

function saveTutor(req,res){

}

function updTutor(req,res){

}

function delTutor(req, res){

}

module.exports = {
    getTutor,
    saveTutor,
    updTutor,
    delTutor
}