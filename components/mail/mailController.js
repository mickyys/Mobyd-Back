"use strict";
const nodemailer = require("nodemailer");


async function get(req, res) {

  try {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let account = await nodemailer.createTestAccount();
    console.log("antes de enviar");


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.mobyd.cl",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "veterinaria@mobyd.cl", // generated ethereal user
        pass: "DQ.7FevczFcs" // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Mobyd 👻" <veterinaria@mobyd.cl>', // sender address
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

module.exports = {
  get
}