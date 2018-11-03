'use strict';

const _ = require('lodash');
const {User , validate} = require('./user')
const bcrypt = require('bcrypt');
const Status = require('../enums/status.enums')


module.exports.getUserMe = async(req, res) =>{
    const user = await User.findById( req.user);
    res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin', 'roles', 'operations', 'photo']));
}

module.exports.getUsers = async (req, res) => {
    const users = await User.find({ status : Status.active }).sort("name");
    res.send(users);
}

module.exports.addUser = async( req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ 
        email : req.body.email,
        status : Status.active
    }); 

    if(user)  return res.status(400).send("Usuario ya existe");
    
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token',token).send(_.pick(user, ['_id', 'name', 'email', 'isAdmin', 'roles', 'operations']));
}