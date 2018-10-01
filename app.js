'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const paciente = require('./components/paciente/pacientesService');
const tutor = require('./components/tutor/tutorsService');
const raza = require('./components/raza/razasService');
const comunes = require('./components/comunes/comunesService');

var app = express();
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());

app.use(morgan('tiny'));
//app.use(accessControl);

app.use('/paciente', paciente);
app.use('/tutor', tutor);
app.use('/raza', raza);
app.use('/comun', comunes);

function accessControl(req, res, next)
{
    console.log("Access control ");

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}

module.exports = app;