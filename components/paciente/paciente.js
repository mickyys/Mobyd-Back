'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var patientSchema = Schema({
    name : { type : String, trim : true, require : true},
    number: { type : Number, required : true},
    species : { type : String, trim : true },
    birthDate : Date,
    race :  { type: Mongoose.Schema.Types.Mixed, ref: 'razas'},
    sex : String,
    microchip : Number,
    photo : String,
    tutor : { type: Mongoose.Schema.Types.ObjectId, ref: 'tutors' },
    observations : { type : String, trim : true},
    death : Number,
    codeVetter : String,
    userCreate : {},
    userModify : {},
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now},
    status : {
      type : Number,
      default : 1
    }  
});


module.exports = Mongoose.model('patient', patientSchema);