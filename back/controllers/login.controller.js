var express = require('express');
var db = require('../database');
var bcrypt = require('bcryptjs');
var keygen = require("keygenerator");
var config = require('../models/config');
var jwt = require('jsonwebtoken');
const login = require('../libs/login');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const loginCtrl = {};

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'gimnasi.santotomas@gmail.com',
        pass: 'Du123.-+85+HOLduf',
        //Du123.-+85+HOLduf
    }
}));

loginCtrl.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
}

loginCtrl.authentication = (req, res) => {
    let cedula = req.body.cedula;
    let password = req.body.password;
    db.query(`SELECT * FROM Persona WHERE cedula = '${cedula}'`, (err, data) => {
        if (err) { 
            res.send('Ocurrio un error en la busqueda' + err) 
        } 
        else {
            console.log(data[0].Password);
            if (data.length == 0) {
                console.log("no existe");
                res.json({ fail: 1 });
            } else if (bcrypt.compareSync(password, data[0].Password) != 1) {
                res.json({ fail: 2 });
                console.log("diferentes");
            } else if (data[0].Activo == false) {
                console.log("No activado");
                id_persona = data[0].Id_persona;
                cedula = data[0].Cedula;
                nombre = data[0].Nombre; 
                rol = data[0].Rol_id_rol;  
                activo = data[0].Activo; 
                token = jwt.sign({id_persona, cedula, nombre, rol, activo},config.secret, { expiresIn: 86400 })
                res.json({ auth: true, token: token, fail: 3 })
            } else {
                console.log("correcto");
                id_persona = data[0].Id_persona;
                cedula = data[0].Cedula;
                nombre = data[0].Nombre; 
                rol = data[0].Rol_id_rol;  
                activo = data[0].Activo;   
                token = jwt.sign({id_persona, cedula, nombre, rol, activo},config.secret, { expiresIn: 86400 })
                res.json({ auth: true, token: token })       
                                  
            }
        }
    });
}

loginCtrl.recoveryCode =  (req, res) => {
    var correo = req.body.correo;
    var key = keygen.password();
    var nombre = '';
    query = `SELECT * FROM Persona WHERE Correo = '${correo}'`;
    query2 = `UPDATE Persona SET Recovery = '${key}' WHERE Correo='${correo}'`;
    db.query(query, function(err, data) {
        if (err) { res.json({ error: err }) } else {
            if (data.length === 0) {
                console.log('no esta registrado ese correo', data);
                res.json({
                    exito: true
                })
            } else {
                console.log('se encontro este usuario', data[0].Nombre);
                nombre = data[0].Nombre;
                db.query(query2, function(err, data) {
                    if (err) {
                        res.json({ error: err });
                    } else {
                        const mailOptions = {
                            from: 'gimnasiouniversidad.santotomas@gmail.com', 
                            to: `${correo}`,  
                            subject: 'CODIGO PARA RECUPERAR CONTRASEÑA PLATAFORMA GIMNASIO',  
                            html: `<h1>Solicitud cambio de contraseña</h1>
                                    <p>Hola ${nombre} tu codigo para poder cambiar la contraseña es <b>${key}</b></p>
                                    <p>Si no solicitaste este codigo , haz caso omiso a este mensaje.</p>` 
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
            }
        }
    });
}

loginCtrl.recoveryPassword =  (req, res) => {
    recovery = req.body;
    console.log('llego esta info del recovery', recovery);
    query = `SELECT Password,Recovery FROM Persona WHERE Correo = '${recovery.correo}'`;
    db.query(query, function(err, data) {
        if (err) { res.json({ error: err }) } else {
            if (data.length === 0) {
                console.log('no esta registrado ese correo', data);
                res.json({
                    exito: false,
                    mensaje: `el correo o codigo de cambio de contraseña son incorrectos`
                })
            } else if (data[0].Recovery === recovery.key) {
                console.log('se encontro este usuario', data);
                var hashedPassword = bcrypt.hashSync(recovery.password, 8);
                query2 = `UPDATE Persona SET Password='${hashedPassword}' WHERE Correo = '${recovery.correo}'`;
                db.query(query2, function(err, data) {
                    if (err) { res.json({ error: err }) } else {
                        res.json({
                            exito: true,
                            mensaje: `Se actualizo correctamente la contraseña para el usuario ${recovery.correo}`
                        })
                    }
                });
            } else {
                res.json({
                    exito: false,
                    mensaje: `El correo o codigo de cambio de contraseña son incorrectos`
                });
            }
        }
    });
}

module.exports = loginCtrl;