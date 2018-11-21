'use strict';

const Joi = require('joi');
const Mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

var User =  Mongoose.Schema({
    _id : { 
        type: Mongoose.Schema.ObjectId, 
        default: Mongoose.Types.ObjectId
    },
    name : { 
        type : String, 
        minlenght : 3,
        maxlenght : 255,
        required : true 
    },
    email : {
        type : String, 
        minlenght : 3,
        maxlenght : 255,
        required : true
    },
    password : {
        type : String, 
        minlenght : 5,
        maxlenght : 1024,
        required : true 
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    status : {
        type : Number,
        default : 1
    },
    photo :{
        type : String
    },
    roles : [],
    operations : []
});

User.methods.generateAuthToken = function(){    
    const token = jwt.sign({ _id : this._id , isAdmin : this.isAdmin}, config.get("jwtPrivatekey"), { expiresIn : '7h' });    
    return token;
}

function validateUser(user){
    const schema = {
        name : Joi.string().min(5).max(50).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);
}


module.exports.User = Mongoose.model('User', User);
module.exports.validate = validateUser;