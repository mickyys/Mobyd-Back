'use strict';
const Agenda = require('./agenda');
const Tutor = require('../tutor/tutor');
const Paciente = require('../paciente/paciente')
const Commune = require('../comunes/comuna');
const { columnsDoctors }  = require('../medicos/medicosController');
//const moment = require('moment-timezone');
const moment = require('moment');

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
        agenda.tutor = tutor;

    } else {
        tutor = await Tutor.findById({
            _id: agenda.tutor
        });

        agenda.tutor = tutor;
    }

    /**
     * Registra nuevo paciente y asocia su ID a la agenda para continuar con el proceso
     */
    if (agenda.isNuevoPaciente) {
        let paciente = new Paciente({
            name: agenda.nombrePaciente,
            tutor: agenda.tutor._id,
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

    console.log(agenda);

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
        tutor: agenda.tutor._id,
        paciente: agenda.paciente._id,
        medico : agenda.medico,
        nombrePaciente: agenda.nombrePaciente,
        nombreTutor: agenda.nombreTutor,
        apellidoTutor : agenda.apellidoTutor,
        rut: agenda.rut,
        correo: agenda.correo,
        telefono: agenda.telefono,
        textColor: 'white',
        className : agenda.className,
        userCreate : { _id : agenda.usuario._id , name : agenda.usuario.name, lastName : agenda.usuario.lastName }
    });

    agendaModel = await agendaModel.save();

    res.status(200).send({
        agenda: agendaModel
    });
}


async function update(req, res){
    
    const agenda = req.body;
    const result = await Agenda.findByIdAndUpdate(agenda._id,
        {
            $set : {
                start: agenda.fechaInicio,
                end: agenda.fechaTermino,
                horaInicio: agenda.horaInicio,
                horaTermino: agenda.horaTermino
            }
        }
    );          

    res.status(200).send({  agenda : result });
}


async function updateConfirmar(req, res){
    
    const agenda = req.body;
    const result = await Agenda.findByIdAndUpdate(agenda._id,
        {
            $set : {
                confirmar: true,
                title : `${agenda.informacion} - Confirmado` 
            }
        }
    );          

    res.status(200).send({  agenda : result });
}

async function get(req, res) {
    let start = moment().add(-1,'days').toDate();
    let end = moment().add(1,'days').toDate();
 
    if(req.query.start){
        start = moment(req.query.start,'DD-MM-YYYY').toDate();      
    }
    
    if(req.query.end){
        end = moment(req.query.end,'DD-MM-YYYY').toDate();
    }

    let agenda = await Agenda.find({
        'start' : { $gte: start},
        'end' : { $lte : end},
        'status': Status.active
    }).populate('tutor')
    .populate('paciente')
    .populate('medico', columnsDoctors)
    ;

    res.status(200).send({
        agenda: agenda
    });
}

async function remove(req, res){

    const agenda = await Agenda.findOneAndUpdate({ _id : req.params.id},{
        $set : { 
            status : Status.noactive 
        }
    });

    res.status(200).send({
        agenda: agenda
    });
}


async function time(req,res){
    
    const agenda = await Agenda.find({
        start : moment(req.params.fecha),
        status : Status.active 
    });

    res.status(200).send({
        agenda: agenda
    });
}

module.exports = {
    save,
    update,
    updateConfirmar,
    get,
    remove,
    time
}