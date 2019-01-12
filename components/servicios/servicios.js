'use strict'

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

module.exports.Servicio = Mongoose.model('servicio', Schema({
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
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date},
    status : {
      type : Number,
      default : 1
    }
}));