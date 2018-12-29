'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ServicioSchema = Schema({    
    tamano : String,
    factor : Number,
    status : { type : Number, default : 1 }     
});

module.exports = Mongoose.model('Servicesdesparasitante', ServicioSchema);