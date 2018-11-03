'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

module.exports.ExamenLaboratorio = Mongoose.model('examenLaboratorio', Schema({
    _id : { 
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    date : { 
        type : Date, 
        required : true 
    },
    comment : {
        type : String
    },
    exam : {
        type : Mongoose.Schema.Types.ObjectId,
        ref: 'examen',
        required : true
    },
    file : {
        type : Mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    status : {
        type : Number,
        default : 1
    }    
}));