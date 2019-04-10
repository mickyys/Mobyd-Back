'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const providerSchema = Schema({
    rut : String,
    name: String,
    location: String,
    fono: String,
    email: String,
    contact: {
        name: String,
        fono: String,
        email: String
    },
    documents: {
        documentType : Number,
        number: Number,
        expirateDate: Date,
        paymentType: String,
        amount: Number,
        iva: Number,
        amountTotal: Number
    },
    payments : {
        number : Number,
        type : String,
        expirateDate : Date,
        amount : Number
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

module.exports = Mongoose.model('provider', providerSchema);