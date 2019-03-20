'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const providerSchema = Schema({
    name: String,
    location: String,
    fono: String,
    email: String,
    contact: {
        name: String,
        fono: String,
        email: String
    },
    invoices: {
        number: Number,
        expirateDate: Date,
        payment: String,
        neto: Number,
        iva: Number,
        total: Number
    },
    payments : {

    },
    userCreate: {},
    userModify: {},
    dateCreate: {
        type: Date,
        default: Date.now
    },
    dateModify: {
        type: Date
    },
    status: {
        type: Number,
        default: 1
    }
});

module.exports = Mongoose.model('provider', patientSchema);