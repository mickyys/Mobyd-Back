'use strict';

var Joi = require('joi');
const {User } = require('../user/user')
const {columns} = require('../user/userController');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.auth = async( req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ 
        email : req.body.email,
        status : Status.active
    }); 

    if(!user)  return res.status(400).send("Usuario o contraseña no valida");
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Usuario o contraseña no valida");

    const token = user.generateAuthToken();

    res.send({token : token });
}


function validate(user){
    const schema = {
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);
}