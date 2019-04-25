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
    lastName : { 
        type : String, 
        minlenght : 0,
        maxlenght : 255 
    },
    email : {
        type : String, 
        minlenght : 3,
        maxlenght : 255,
        required : true
    },
    address : {
        type : String, 
        minlenght : 0,
        maxlenght : 3000,
    },
    commune :  { 
        type: Mongoose.Schema.Types.Mixed, ref: 'comuna'
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
    const token = jwt.sign({ _id : this._id , isAdmin : this.isAdmin}, process.env.JWT, { expiresIn : '7d' });    
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


User.set('toObject', { virtuals: true });

User.virtual('fullName').get(function () {
    return  `${this.lastName} ${this.name}`; 
});

module.exports.User = Mongoose.model('User', User);
module.exports.validate = validateUser;