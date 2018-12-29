'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const DesparasitanteSchema = Schema({    
    descripcion : String,
    precio : Number,
    status : {type : Number, default : 1}
});

module.exports = Mongoose.model('desparasitante', DesparasitanteSchema);