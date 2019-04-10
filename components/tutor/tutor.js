'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var tutorSchemma = Schema({
    rutDV: String,
    name : String,
    lastName : String,
    address : String,
    phone : String,
    birthDate : Date,
    location : String,
    commune :  { type: Mongoose.Schema.Types.Mixed, ref: 'comuna'},
    location : String,
    email : String,
    photo : String,
    vip : Number,
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date} ,
    status : { type : Number, default: 1} 
});

Mongoose.set('debug', true);

module.exports = Mongoose.model('tutors', tutorSchemma);