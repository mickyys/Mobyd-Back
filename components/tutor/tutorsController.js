'use strict';

const Tutor = require('./tutor');
const Status = require('../enums/status.enums');
const _ = require('lodash');

/**
 * Retorna informacion del tutor por rut
 * @param req The request contiene rut del tutor
 * @param res The response retorna información del tutor
 */
async function getTutorRut(req, res) {
    const rut = req.params.rut;

    let result = await Tutor.findOne({
        'rutDV': rut
    });

    res.status(200).send({
        tutor: result
    });
}


/**
 * Retorna información del tutor si contiene el ID, en caso de no traer retorna todos los pacientes activos
 * @param req The request contiene el ID enviado en la URL
 * @param res The response retorna estado y pacientes en formato rest
 */
async function getTutor(req, res) {
    const id = req.params.id;
    let result;

    if (id) {
        result = await Tutor.findById(id).sort('lastName name');
        res.status(200).send({
            tutor: result
        });
    } else {
        if(req.query.simple === 'true'){
        
            result = await Tutor.find({
                'status': Status.active
            }).select('_id name lastName').sort('lastName name');
            
            res.status(200).send({
                tutors: result
            });
        }else{
            
            result = await Tutor.find({
                'status': Status.active
            }).sort('lastName name');

            res.status(200).send({
                tutors: result
            });
        }
       
    }
}


/**
 * Guarda en la bd la información del tutor
 * @param req The request contiene la información del tutor
 * @param res The response retorna información del tutor con un ID unico
 */
async function saveTutor(req, res) {

    const tutor = new Tutor(req.body);
    let result = await tutor.save();

    res.status(200).send({
        result
    });
}


/**
 * Actualiza la información del tutor
 * @param req The request contiene la información del tutor
 * @param res The response retorna estado e información modificada.
 */
async function updTutor(req, res) {

    let result = await Tutor.findByIdAndUpdate({
        _id: req.body._id
    }, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}

/**
 * Elimina logicamente la información del tutor
 * @param req The request contiene id y usuario
 * @param res The response retorna estado y mensaje de confirmación
 */
async function delTutor(req, res) {
    const id = req.params.id;
    const user = req.params.user;

    let result = await Tutor.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            status: Status.noactive,
            userModify: user,
            dateModify: Date.now()
        }
    });

    res.status(200).send({
        message: 'Tutor eliminado correctamente'
    });

}

module.exports = {
    getTutor,
    getTutorRut,
    saveTutor,
    updTutor,
    delTutor
}