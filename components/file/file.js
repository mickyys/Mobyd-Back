'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var file = Schema(
    {
        _id : {
            type : mongoose.Schema.ObjectId,
            default : mongoose.Types.ObjectId
        },
        name : {
            type : String,
            required : true
        },
        extension : {
            type : String,
            required : true
        },
        status : {
            type : Number,
            default : 1
        },
        googleId : {
            type : String
        }
    },{
        'toObject' : { virtuals: true },
        'toJSON' : { virtuals: true }
    }
);

file.virtual('googleURL').get(function () {
    return 'https://drive.google.com/file/d/' + this.googleId + '/preview';
});

file.virtual('googleURLview').get(function () {
    return 'https://drive.google.com/file/d/' + this.googleId + '/view';
});

module.exports.File = mongoose.model('File', file);