'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const generalSchemma = Schema({
    company : {
        name : { type : String, required :  true, trim : true},
        address : { type : String , trim : true},
        location : { type : String , trim : true},
        url : { type: String , trim : true},
        phone : [String]
    },    
    messageWhatsapp : { type : String, trim : true},
    tax : [ Number ],
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date},
    status : { type : Number, default : 1}
});

module.exports = Mongoose.model('general', generalSchemma);