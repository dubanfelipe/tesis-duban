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
        pass: 'qnaqyltllkrcofyr',
    }
}));


emailCtrl.postFormulario = (req, res) => {
    var correo = req.body.Correo;
    var texto = req.body.Texto;
    db.query(`SELECT * FROM Persona WHERE Correo = '${correo}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda del Persona" + err);
        } else {
            nombre = data[0].Nombre;
            const mailOptions = {
                from: 'gimnasi.santotomas@gmail.com', // dirección del remitente 
                to: `${correo}`, // lista de los destinatarios del 
                subject: 'SOLICITUD DENAGADA PARA EL REGISTRO EN EL GIMNASIO', // Línea del asunto 
                html: `<p>Hola ${nombre}, su solicitud para la activación del gimansio fue denegada por la siguiente razon:</p>
                        <p>${texto}</p>`  // cuerpo de texto sin formato 
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
        }
    });
};

module.exports = emailCtrl