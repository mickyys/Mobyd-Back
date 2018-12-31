'use strict';

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const paciente = require('./components/paciente/pacientesService');
const pacienteTratamiento = require('./components/pacienteTratamiento/pacienteTratamientoService');
const pacienteInformeMedico = require('./components/pacienteInformeMedico/pacienteInformeMedicoService');
const pacienteExamenLaboratorio = require('./components/pacienteExamenLaboratorio/pacienteExamenLaboratorioService');
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

var app = express();
app.use(express.urlencoded({ limit: '50mb', extended : true}));
app.use(express.json({ limit: '50mb'}));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use(cors());

app.use('/paciente', paciente);

// app.use('/paciente/{paciente}/tratamiento', pacienteTratamiento);
// app.use('/paciente/{paciente}/informeMedico', pacienteInformeMedico);
// app.use('/paciente/{paciente}/examenLaboratorio', pacienteExamenLaboratorio);
// app.use('/paciente/{paciente}/pacienteCalendar', pacienteCalendar);

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
app.use(error);

module.exports = app;