'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var LaboratorioSchema = Schema({
    _id : {
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    descripcion : String    
});

module.exports = Mongoose.model('laboratorios', LaboratorioSchema);

