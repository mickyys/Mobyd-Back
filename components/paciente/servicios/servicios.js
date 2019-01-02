'use strict'

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

module.exports.Servicio = Mongoose.model('PatientServices', Schema({
    _id: {
        type: Mongoose.Schema.ObjectId,
        default: Mongoose.Types.ObjectId
    },
    paciente : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
    service : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'servicio'
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status : {
        type : Number,
        default : 1
    }
}));