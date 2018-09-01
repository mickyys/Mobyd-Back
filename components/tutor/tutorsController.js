'use strict'

var Tutor = require('./tutor');
var Enum = require('enum');
/**
 * Es un lista de valor para estados
 * Activo 1
 * No activo 0
 */
var status = new Enum({
    'active': 1,
    'noActive': 0
});


/**
 * Retorna información del tutor si contiene el ID, en caso de no traer retorna todos los pacientes activos
 * @param req The request contiene el ID enviado en la URL
 * @param res The response retorna estado y pacientes en formato rest
 */
function getTutor(req, res) {
    var id = req.params.id;

    if (id) {
        Tutor.findById(id, (err, tutor) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en servidor al obtener el tutor'
                });
            }

            if (!tutor) {
                res.status(404).send({
                    message: 'No existe tutor'
                });
            }

            res.status(200).send({
                tutor
            });

        });
    } else {
        Tutor.find({
            'status': status.getValue('active')
        }, (err, tutors) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en servidor'
                });
            }

            if (!tutors) {
                res.status(404).send({
                    message: 'No hay tutores'
                });
            }

            res.status(200).send({
                tutors
            });
        });
    }

}

/**
 * Guarda en la bd la información del tutor
 * @param req The request contiene la información del tutor
 * @param res The response retorna información del tutor con un ID unico
 */
function saveTutor(req, res) {
    var params = req.body;

    console.log(params);

    var tutor = new Tutor({
        rut: params.rut,
        dv: params.dv,
        name: params.name,
        lastName: params.lastName,
        address: params.address,
        phone: params.phone,
        localtion: params.localtion,
        commune: params.commune,
        communeId: params.communeId,
        email: params.email,
        photo: params.photo,
        vip: params.vip,
        userCreate: params.user,
        userModify: params.user,
        status: status.getValue('active')
    });

    tutor.save((err, tutorStore) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el tutor',
                err
            });
        } else {
            res.status(200).send({
                tutor: tutorStore
            });
        }
    });
}


/**
 * Actualiza la información del tutor
 * @param req The request contiene la información del tutor
 * @param res The response retorna estado e información modificada.
 */
function updTutor(req, res) {
    var params = req.body;
    var id = params._id;
    /*
    var tutor = new Tutor({
        rut: params.rut,
        dv: params.dv,
        name: params.name,
        lastName: params.lastName,
        address: params.address,
        phone: params.phone,
        localtion: params.localtion,
        commune: params.commune,
        communeId: params.communeId,
        email: params.email,
        photo: params.photo,
        vip: params.vip,
        userModify: params.user,
        dateModify: Date.now()
    });

    console.log(params);*/
    
    Tutor.findByIdAndUpdate({
        _id: id
    }, {
        $set: {
            rut: params.rut,
            dv: params.dv,
            name: params.name,
            lastName: params.lastName,
            address: params.address,
            phone: params.phone,
            localtion: params.localtion,
            commune: params.commune,
            communeId: params.communeId,
            email: params.email,
            photo: params.photo,
            vip: params.vip,
            userModify: params.user,
            dateModify: Date.now()

        }
    }, (err, tutorStore) => {
        if (err) {
            res.status(500).send({
                message: 'Error al modificar el tutor',
                err
            });
        } else {
            res.status(200).send({
                tutor: tutorStore
            });
        }
    });
}

/**
 * Elimina logicamente la información del tutor
 * @param req The request contiene id y usuario
 * @param res The response retorna estado y mensaje de confirmación
 */
function delTutor(req, res) {
    var id = req.params.id;
    var user = req.params.user;

    Tutor.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            status: status.getValue('noActive'),
            userModify: user,
            dateModify: Date.now()
        }
    }, (err, tutorStore) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar el tutor',
                err
            });
        } else {
            res.status(200).send({
                message: 'Tutor eliminado correctamente'
            });
        }
    });
}

module.exports = {
    getTutor,
    saveTutor,
    updTutor,
    delTutor
}