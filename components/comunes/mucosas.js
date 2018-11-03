'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var MucosaSchema = Schema({
    _id : {
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    descripcion : {
        type : String,
        minlength : 3,
        trim : true,
        required : true
    }
});

module.exports = Mongoose.model('mucosas', MucosaSchema);
