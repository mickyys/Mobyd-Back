'use strict';

const _ = require('lodash');
const {User , validate} = require('./user')
const bcrypt = require('bcrypt');
const Status = require('../enums/status.enums')

const columns = ['_id', 'name', 'lastName', 'email', 'address', 'commune' , 'isAdmin', 'roles', 'operations', 'photo'];


module.exports.getUserMe = async(req, res) =>{
    const user = await User.findById(req.user);
    res.send(_.pick(user, columns));
}

module.exports.getUsers = async (req, res) => {
    const users = await User.find({ status : Status.active }).sort("name");
    res.send(users);
}

module.exports.addUser = async( req, res) => {
    // const {error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    
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
    res.header('x-auth-token',token).send(_.pick(user, columns));
}

module.exports.update = async(req, res)=>{
    

    if(req.body.password){
        console.log("password");
        let user = await User.findById(req.body._id);
        const IsPasswordValid = await validPassword(req.body.password, user.password);    
        if(!IsPasswordValid) return res.status(400).send("Contraseña no valida");

        req.body.password = await generatePassword(req.body.password);
    }

    let user = await User.findByIdAndUpdate(req.body._id, {$set: req.body }, {upsert:true});       
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user, columns));    
}

module.exports.changePassword = async(req, res) =>{
    let user = await User.findById(req.user);
    console.log(req.body);
        
    const isPasswordValid = await validPassword(req.body.password, user.password);    
    if(!isPasswordValid) return res.status(400).send("Contraseña no valida");

    let newPassword = await generatePassword(req.body.newPassword);

    user = await User.findByIdAndUpdate(user._id, { $set : {'password' : newPassword}});
    
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user, columns));    
}

async function validPassword(newPassword, bcryptPassword){
    console.log("validPassword");
    
    const validPassword = await bcrypt.compare(newPassword, bcryptPassword);
    return validPassword;
}

async function generatePassword(newPassword){
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);    
    return password;
}