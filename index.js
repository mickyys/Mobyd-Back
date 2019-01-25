'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const config = require('config');
const port = process.env.PORT || 3000;
const nameApp = config.get('nameApp');


if(!config.get('jwtPrivatekey'))
{
    console.error("Fatal error : jwtPrivatekey no definida");
    process.exit(1);
}

mongoose.connect(config.get('bd'), { 
    'useNewUrlParser': true
},(err,res)=>{
    if(err){
        throw err;
    }
    app.listen(port, () =>{
        console.log(`Aplicacion ${nameApp} - iniciado en puerto : ${port}` );
    });
});

