'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

module.exports.Examen = Mongoose.model('examen', Schema({
    _id: {
        type: Mongoose.Schema.ObjectId,
        default: Mongoose.Types.ObjectId
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