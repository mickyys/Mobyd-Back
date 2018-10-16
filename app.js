'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const paciente = require('./components/paciente/pacientesService');
const tutor = require('./components/tutor/tutorsService');
const raza = require('./components/raza/razasService');
const comunes = require('./components/comunes/comunesService');
const tratamiento = require('./components/tratamientos/tratamientosService');
const agenda = require('./components/agenda/agendaService');
const desparasitante = require('./components/desparasitante/desparasitanteService');

var app = express();
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({origin: 'http://localhost:4200'}));

app.use('/paciente', paciente);
app.use('/tutor', tutor);
app.use('/raza', raza);
app.use('/comun', comunes);
app.use('/tratamiento', tratamiento);
app.use('/agenda', agenda);
app.use('/desparasitante', desparasitante);

module.exports = app;