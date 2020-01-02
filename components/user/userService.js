'use strict';

const express = require('express');
const { getUserMe , getUsers, addUser, update, updateAdmin, changePassword, removeUser, mailNewUser, mailNewUserValid } = require('./userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const api = express.Router();

api.get('/me', [auth], getUserMe);
api.get('/', [auth],getUsers);
api.delete('/delete/:id', auth, async(req, res)=>{
    const id = req.param.id;
    const user = await removeUser(id);
    res.send(user);
});
api.post('/', [auth], addUser);

api.post('/mailNewUser', auth, async(req, res)=>{
    let result = await mailNewUser(req.body.name,req.body.mail);
    res.send({'result' : result})
});

api.post('/mailNewUser/valid', auth, async(req, res)=> {
    console.timeLog(req.body.token);
    let result = await mailNewUserValid(req.body.token);
    res.send({'result' : result})
});

api.put('/',[auth], update)

api.put('/admin',[auth], async(req, res)=>{
    let user = await updateAdmin(req.body);
    res.send(user);
});

api.put('/changePassword', [auth], changePassword);

module.exports = api;