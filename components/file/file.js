'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports.File = mongoose.model('File', schema(
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
    }
));