'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const providerSchema = Schema({
    rut : { type : String,  uppercase: true }, 
    name: String,
    location: String,
    fono: String,
    email: String,
    contacts: [{
        name: String,
        fono: String,
        email: String,
        info : String
    }],
    documents: [{
        documentType : {
            _id : String,
            description : String,
            __v : Number,
            status : { 
                type : Number, 
                default : 1 
            }            
        },
        products : [{
            name : { type : String, uppercase : true},
            qty : Number,
            type : { type: Mongoose.Schema.Types.ObjectId, ref: 'ProductsType', required : true},      
            price : Number,
            priceTax : Number,
            priceTotal : Number,      
            amount : Number,
            amountTax : Number,
            amountTotal : Number, 
            status : { 
                type : Number, 
                default : 1 
            }
        }], 
        number: Number,
        expirateDate: Date,
        paymentType: {
            _id : String,
            description : String,
            __v : Number
        },  
        amount: Number,
        amountTax: Number,
        amountTotal: Number,
        status : { 
            type : Number, 
            default : 1 
        }
    }],
    payments: [{
        number : Number,
        paymentType : {
            _id : String,
            description : String,
            __v : Number,
            status : { 
                type : Number, 
                default : 1 
            }
        }, 
        expirateDate : Date,
        amount : Number
    }],
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