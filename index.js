'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

//var path = "mongodb://localhost:27017/mobyd";
var path = "mongodb://MongoBD:Hampmobyd1@ds137581.mlab.com:37581/mobyd";

mongoose.connect("mongodb://mobyd:a123456@ds137581.mlab.com:37581/mobyd", { useNewUrlParser: true },(err,res)=>{
    if(err){
        throw err;
    }
    app.listen(port, () =>{
        console.log('iniciado en puerto : ' + port);
    });
});

