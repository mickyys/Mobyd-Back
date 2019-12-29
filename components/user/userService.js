'use strict';

const express = require('express');
const { getUserMe , getUsers, addUser, update, updateAdmin, changePassword, removeUser } = require('./userController');
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
api.put('/',[auth], update)

api.put('/admin',[auth], async(req, res)=>{
    let user = await updateAdmin(req.body);
    res.send(user);
});

api.put('/changePassword', [auth], changePassword);

module.exports = api;