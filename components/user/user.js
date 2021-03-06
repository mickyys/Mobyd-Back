'use strict';

const Mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    rut : {
        type : String
    },
    className : {
        type : String
    },
    roles : [],
    operations : [],
    redSocial : {
        id : {
            type : String
        },
        name : {
            type : String
        }
    },
    company : { type: Mongoose.Schema.Types.ObjectId, ref: 'general' },
    color : {
        type : String,
        default : '#631B87'
    }
},{
    'toObject' : { virtuals: true },
    'toJSON' : { virtuals: true }
});

User.methods.generateAuthToken = function(){    
    const token = jwt.sign({ _id : this._id , isAdmin : this.isAdmin}, process.env.JWT, { expiresIn : '7d' });    
    return token;
}


User.virtual('fullName').get(function () {
    return `${this.name} ${this.lastName}`; 
});


module.exports.User = Mongoose.model('User', User);