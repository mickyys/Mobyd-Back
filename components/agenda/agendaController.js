'use strict';
const Agenda = require('./agenda');
const Tutor = require('../tutor/tutor');
const Paciente = require('../paciente/paciente')
const Commune = require('../comunes/comuna');
const config = require('config');

async function save(req, res) {

    let agenda = req.body;
    let tutor = null;

    /**
     * Valida si es necesario crear el tutor o obtener su informacion a partir desde el _id
     */
    if (agenda.isNuevoTutor) {

        let comuna = await Commune.findById(65); //San Antonio

        tutor = new Tutor({
            rutDV: agenda.rut,
            name: agenda.nombreTutor,
            lastName: agenda.apellidoTutor,
            address : null,            
            phone: agenda.telefono,
            birthDate : null,
            location : null,
            commune : comuna,
            email: agenda.correo,
            photo : null,
            vip : null,
            userCreate : { _id : agenda.usuario._id , name : agenda.usuario.name, lastName : agenda.usuario.lastName }
        });
        tutor = await tutor.save();

    } else {
        tutor = await Tutor.findById({
            _id: agenda.tutor
        });
    }

    /**
     * Registra nuevo paciente y asocia su ID a la agenda para continuar con el proceso
     */
    if (agenda.isNuevoPaciente) {
        let paciente = new Paciente({
            name: agenda.nombrePaciente,
            tutor: tutor,
            birthDate : null,
            sex : null,
            microchip : null,
            photo : null,
            observations : null,
            death : 0,
            userCreate : { _id : agenda.usuario._id , name : agenda.usuario.name, lastName : agenda.usuario.lastName }
        });
        paciente = await paciente.save();
        agenda.paciente = paciente;
    }


    /**
     * Hora agendada por rut de titular o nombre de titular
     */
    let agendaModel = new Agenda({
        title: `Tutor : ${tutor.name} ${(tutor.lastName === undefined) ? '' : tutor.lastName} - Paciente : ${agenda.paciente.name}`,
        start: agenda.fechaInicio,
        end: agenda.fechaTermino,
        description: agenda.informacion,
        // url: config.get('url') + 'patient/' + agenda.paciente._id,
        horaInicio: agenda.horaInicio,
        horaTermino: agenda.horaTermino,
        tutor: tutor,
        paciente: agenda.paciente,
        nombrePaciente: agenda.nombrePaciente,
        nombreTutor: agenda.nombreTutor,
        apellidoTutor : agenda.apellidoTutor,
        rut: agenda.rut,
        correo: agenda.correo,
        telefono: agenda.telefono,
        textColor: 'white',
        userCreate : { _id : agenda.usuario._id , name : agenda.usuario.name, lastName : agenda.usuario.lastName }
    });

    agendaModel = await agendaModel.save();

    res.status(200).send({
        agenda: agendaModel
    });
}

async function get(req, res) {
    let agenda = await Agenda.find({
        'status': Status.active
    });

    res.status(200).send({
        agenda: agenda
    });
}

async function remove(req, res){
    console.log(req.params.id);
    const agenda = await Agenda.findOneAndUpdate({ _id : req.params.id},{
        $set : { 
            status : Status.noactive 
        }
    });

    res.status(200).send({
        agenda: agenda
    });
}


module.exports = {
    save,
    get,
    remove
}