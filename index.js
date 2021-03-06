'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const config = require('config');
const saslprep = require('saslprep')

const port = process.env.PORT || 3001;
const nameApp = config.get('nameApp');
let prueba = 123;

if(!process.env.JWT){
    console.error("Fatal error : jwtPrivatekey no definida");
    process.exit(1);
}

let conexion = saslprep(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_BD}`);
if(process.env.NODE_ENV != 'produccion'){
    conexion = saslprep(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_BD}`);
}

mongoose.connect(conexion, { 
    'useNewUrlParser': true,
    'useUnifiedTopology': true 
},(err,res)=>{
    if(err){
        throw err;
    }
    app.listen(port, () =>{
        console.log(`Aplicacion  ${nameApp} - iniciado en puerto : ${port} - BD : ${conexion}`);
    });
});

