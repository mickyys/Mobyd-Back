'use strict';

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const paciente = require('./components/paciente/pacientesService');
const tutor = require('./components/tutor/tutorsService');
const raza = require('./components/raza/razasService');
const comunes = require('./components/comunes/comunesService');
const agenda = require('./components/agenda/agendaService');
const desparasitante = require('./components/desparasitante/desparasitanteService');
const users = require('./components/user/userService');
const auth = require('./components/auth/authService');
const error = require("./components/middleware/error")
const examen = require('./components/examen/examenService');
const file = require('./components/file/fileService');
const servicios = require('./components/servicios/serviciosService');
const estetica = require('./components/estetica/esteticaService');
const medicos = require('./components/medicos/medicosService');
const proveedores = require('./components/proveedores/proveedoresService');
const mail = require('./components/mail/mailService'); 
const type = require('./components/tipos/tipoService'); 
const revacunation = require('./components/revacunacion/revacunacionService');
const general = require('./components/general/generalService');

const app = express();
app.use(express.urlencoded({ limit: '50mb', extended : true}));
app.use(express.json({ limit: '50mb'}));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(compression());

app.use('/mail', mail);
app.use('/paciente', paciente);
app.use('/tutor', tutor);
app.use('/raza', raza);
app.use('/comun', comunes);
app.use('/agenda', agenda);
app.use('/desparasitante', desparasitante);
app.use('/users', users);
app.use('/auth', auth);
app.use('/examen', examen);
app.use('/file', file);
app.use('/servicios', servicios);
app.use('/estetica', estetica);
app.use('/medicos', medicos);
app.use('/proveedores', proveedores);
app.use('/type', type);
app.use('/revacunation', revacunation);
app.use('/general', general)

app.use(error);

module.exports = app;