'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const HistorialSchema = Schema({
    _id: {
        type: Mongoose.Schema.ObjectId,
        default: Mongoose.Types.ObjectId
    },
    patient: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'patients',
        required: true
    },
    description: String,
    status: {
        type: Number,
        default: 1
    }
});

module.exports = Mongoose.model('patientsHistorial', HistorialSchema);