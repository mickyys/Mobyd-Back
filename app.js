'use strict';

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
const informeMedico = require('./components/informeMedico/informeMedicoService');
const users = require('./components/user/userService');
const auth = require('./components/auth/authService');
const error = require("./components/middleware/error")
const examenLaboratorio = require('./components/examenLaboratorio/examenLaboratorioService');
const examen = require('./components/examen/examenService');
const file = require('./components/file/fileService');

var app = express();
app.use(express.urlencoded({ limit: '50mb', extended : true}));
app.use(express.json({ limit: '50mb'}));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use(cors());

app.use('/paciente', paciente);
app.use('/tutor', tutor);
app.use('/raza', raza);
app.use('/comun', comunes);
app.use('/tratamiento', tratamiento);
app.use('/agenda', agenda);
app.use('/desparasitante', desparasitante);
app.use('/informeMedico', informeMedico);
app.use('/users', users);
app.use('/auth', auth);
app.use('/examenLaboratorio', examenLaboratorio);
app.use('/examen', examen)
app.use('/file', file)
app.use(error);

module.exports = app;