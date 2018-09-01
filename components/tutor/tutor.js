'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var tutorSchemma = Schema({
    rut : Number,
    dv : String,
    name : String,
    lastName : String,
    address : String,
    phone : Number,
    localtion : String,
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

module.exports = Mongoose.model('tutor', tutorSchemma);