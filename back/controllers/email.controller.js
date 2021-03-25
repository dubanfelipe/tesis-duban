var express = require('express');
const { request } = require('http');
var db = require('../database');
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const emailCtrl = {};

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'gimnasi.santotomas@gmail.com',
        pass: 'Du123.-+85+HOLduf',
    }
}));


emailCtrl.postFormulario = (req, res) => {
    var correo = req.body.Correo;
    var texto = req.body.Texto;
    console.log(correo);
    const mailOptions = {
        from: 'gimnasiouniversidad.santotomas@gmail.com', // dirección del remitente 
        to: `${correo}`, // lista de los destinatarios del 
        subject: 'SOLICITUD DENAGADA PARA EL REGISTRO EN EL GIMNASIO', // Línea del asunto 
        html: `${texto}` // cuerpo de texto sin formato 
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err)
            res.json({ exito: false });
        } else {
            console.log(info);
            res.json({ exito: true });
        }
    });
};

module.exports = emailCtrl