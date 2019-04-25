'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const config = require('config');
const port = process.env.PORT || 3000;
const nameApp = config.get('nameApp');


if(!process.env.JWT)
{
    console.error("Fatal error : jwtPrivatekey no definida");
    process.exit(1);
}

const conexion = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_BD}?authSource=admin`;

mongoose.connect(conexion, { 
    'useNewUrlParser': true
},(err,res)=>{
    if(err){
        throw err;
    }
    app.listen(port, () =>{
        console.log(`Aplicacion ${nameApp} - iniciado en puerto : ${port} - BD : ${conexion}`);
    });
});

