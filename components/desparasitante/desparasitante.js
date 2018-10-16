'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var DesparasitanteSchema = Schema({
    _id : {type: Mongoose.Schema.ObjectId, default: Mongoose.Types.ObjectId},
    descripcion : String,
    precio : Number,
    status : {type : Number, default : 1}
});

module.exports = Mongoose.model('desparasitante', DesparasitanteSchema);