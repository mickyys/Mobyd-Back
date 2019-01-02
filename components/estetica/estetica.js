'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const EsteticaSchema = Schema({
    _id : {
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    status : { 
        type : Number, 
        default : 1
    }
});

module.exports.Estetica = Mongoose.model('estetica', EsteticaSchema);