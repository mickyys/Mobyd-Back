'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var patientSchema = Schema({
    name : { type : String, require : true},
    species : String,
    speciesType : Number,
    birthDate : Date,
    race :  { type: Mongoose.Schema.Types.Mixed, ref: 'razas'},
  //  raceType : Number,
    sex : String,
    microchip : Number,
    photo : String,
    tutor : { type: Mongoose.Schema.Types.ObjectId, ref: 'tutors' },
    status : Number,
    observations : String,
    death : Number,
    userCreate : String,
    userModify : String,
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now}  
});

module.exports = Mongoose.model('patient', patientSchema);