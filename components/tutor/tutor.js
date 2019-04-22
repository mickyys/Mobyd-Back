'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var tutorSchemma = Schema({
    rutDV: { type : String, trim : true},
    name : { type : String, trim : true},
    lastName : { type : String, trim : true},
    address : { type : String, trim : true},
    phone : { type : String, trim : true},
    birthDate : Date,
    location : String,
    commune :  { type: Mongoose.Schema.Types.Mixed, ref: 'comuna'},
    location : { type : String, trim : true},
    email : { type : String, trim : true},
    photo : String,
    vip : Number,
    codeVetter : String,
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date} ,
    status : { type : Number, default: 1} 
});

module.exports = Mongoose.model('tutors', tutorSchemma);