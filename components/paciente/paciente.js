'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var patientSchema = Schema({
    name : { type : String, require : true},
    // species : { type: Mongoose.Schema.Types.Mixed, ref: 'razas'},
    // speciesType : Number,
    birthDate : Date,
    race :  { type: Mongoose.Schema.Types.Mixed, ref: 'razas'},
    sex : String,
    microchip : Number,
    photo : String,
    tutor : { type: Mongoose.Schema.Types.ObjectId, ref: 'tutors' },
    observations : String,
    death : Number,
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now},
    status : {
      type : Number,
      default : 1
    }  
});

Mongoose.set('debug', true);

module.exports = Mongoose.model('patient', patientSchema);