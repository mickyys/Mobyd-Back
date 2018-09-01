'use strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var tutorSchemma = Schema({
    rut : Number,
    dv : String,
    name : String,
    lastName : String,
    Adress : String,
    phone : Number,
    localtion : String,
    city : String,
    cityId : { type: Mongoose.Schema.Types.ObjectId, ref: 'city' },
    email : String,
    photo : String,
    vip : Number
});

module.exports = Mongoose.model('tutor', tutorSchemma);