'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TratamientoSchema = Schema({
    _id : {
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    fecha : String,
    hora : String,
    vacuna : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'vacuna'
    },
    servicio : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'servicesdesparasitante'
    },
    desparasitante : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'desparasitante'
    },
    comentario : String,
    precio : Number,
    paciente : String,
    status : { 
        type : Number, 
        default : 1
    },
    tipo : { 
        type : String,
        enum : ['Vacuna', 'Desparasitante', 'Ectoparasitos'],
        required : true
    }
});

module.exports = Mongoose.model('tratamientos', TratamientoSchema);