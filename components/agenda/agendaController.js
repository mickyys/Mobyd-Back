'use strict';
const Agenda = require('./agenda');
const Tutor = require('../tutor/tutor');
const config = require('config');

async function save(req, res) {

    let agenda = req.body;

    if(agenda.isNuevoPaciente || agenda.isNuevoTutor){

    }else{

        /**
         * Hora agendada por rut de titular
         */
        if(agenda.rut){
            let tutor = await Tutor.find({_id : agenda.tutor});

            let agendaModel = new Agenda({
                title : `Tutor : ${tutor[0].name} ${tutor[0].lastName} - Paciente : ${agenda.paciente.name}`,
                start : agenda.fechaInicio,
                end : agenda.fechaTermino,                
                description : agenda.informacion, 
                // url: config.get('url') + 'patient/' + agenda.paciente._id,
                horaInicio : agenda.horaInicio,
                horaTermino : agenda.horaTermino,
                tutor : tutor[0],
                paciente : agenda.paciente,
                nombrePaciente : agenda.nombrePaciente,
                nombreTutor : agenda.nombreTutor,
                rut : agenda.rut,
                correo : agenda.correo,
                telefono : agenda.telefono,
                textColor : 'white'
            });

            agendaModel = await agendaModel.save();

            res.status(200).send({
                agenda: agendaModel
            });
        }
        
    }
}

async function get(req, res){
    let agenda = await Agenda.find({
        'status': Status.active
    });

    res.status(200).send({
        agenda : agenda 
    });
}


module.exports = {
    save,
    get
}