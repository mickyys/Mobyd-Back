'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var tutorSchemma = Schema({
    rutDv: String,
    name : String,
    lastName : String,
    address : String,
    phone : Number,
    birthDate : Date,
    location : String,
    commune : String,
    communeId : Number, // { type: Mongoose.Schema.Types.ObjectId, ref: 'comuna' },
    email : String,
    photo : String,
    vip : Number,
    userCreate : String,
    userModify : String,
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now} ,
    status : { type : Number, default: 1} 
});

module.exports = Mongoose.model('tutors', tutorSchemma);