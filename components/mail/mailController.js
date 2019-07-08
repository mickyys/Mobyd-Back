"use strict";
const nodemailer = require("nodemailer");
const mailgun = require("mailgun-js");
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const config = require('config');

const mg = mailgun({apiKey: process.env.EMAIL_MAILGUN, domain: process.env.EMAIL_DOMAIN});  

async function get(req, res) {

  try {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let account = await nodemailer.createTestAccount();
    console.log("antes de enviar");


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mobyddrive@gmail.com",
        pass: "Mobyd201811" // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'mobyddrive@gmail.com', // sender address
      to: "hamp.martinez@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

    // console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.status(200).send({
      result: "info"
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.reason
    });
  }
}

async function getMailgun(req,res){     
  let filename = path.join(__dirname, 'template/img/logo.png');
  let contents = fs.readFileSync(__dirname + '/template/reservaHoraResponsive.html', 'utf8');
  const data = {
    from: "hamp@mobyd.cl",
    to: "hamp.martinez@gmail.com",
    subject: "Hello",
    html : contents,
    inline:filename
  };

  
  mg.messages().send(data, function (error, body) {
    console.log(body);
    res.send(body);
  });
}

async function sendMailReserva(agenda){

  let imgName = 'mobyd.png';
  let filename = path.join(__dirname, 'template/img/' + imgName);
  let contents = fs.readFileSync(__dirname + '/template/reservaHoraResponsive.html', 'utf8');

  if(agenda.tutor.lastName === undefined){
    agenda.tutor.lastName = '';
  }
  if(agenda.tutor.name === undefined){
    agenda.tutor.name = '';
  }

  contents = contents.replace('{IMG}', imgName);
  contents = contents.replace('{TUTOR}', `${agenda.tutor.name} ${agenda.tutor.lastName}`);
  contents = contents.replace('{PACIENTE}', agenda.paciente.name);
  contents = contents.replace('{FECHA}', moment(agenda.fechaInicio).format('DD-MM-YYYY'));
  contents = contents.replace('{HORA}', agenda.horaInicio);
  contents = contents.replace('{MEDICO}', `${agenda.medico.name} ${agenda.medico.lastName}`);
  contents = contents.replace(/{ID}/g, agenda._id);
  contents = contents.replace(/{URL}/g, config.get('url'));

  const data = {
    from: "contacto@mobyd.cl",
    to: 'hamp.martinez@gmail.com', //agenda.correo
    subject: "🐶 Reserva Hora | Mobyd 🐱",
    html : contents,
    inline: filename
  };

  mg.messages().send(data, (error, body) => {    
    console.log(body);
  });
}

module.exports = {
  get,
  getMailgun,
  sendMailReserva
}