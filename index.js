'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mobyd', { useNewUrlParser: true },(err,res)=>{
    if(err){
        throw err;
    }
    app.listen(port, () =>{
        console.log('iniciado en puerto : ' + port);
    });
});

