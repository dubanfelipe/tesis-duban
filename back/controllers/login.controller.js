var express = require('express');
var db = require('../database');
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var keygen = require("keygenerator");
var config = require('../models/config');
var jwt = require('jsonwebtoken');
const login = require('../libs/login');

const loginCtrl = {};

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
            if (data.length == 0) {
                console.log("no existe");
                res.json({ fail: 1 });
            } else if (bcrypt.compareSync(password, data[0].PASSWORD) != 1) {
                res.json({ fail: 2 });
                console.log("diferentes");
            } else if (data[0].ACTIVO == false) {
                res.json({ fail: 3 });
                console.log("No activado");
            } else {
                console.log("correcto");
                id_persona = data[0].ID_PERSONA;
                cedula = data[0].CEDULA
                nombre = data[0].NOMBRE; 
                rol = data[0].ROL_ID_ROL;              
                db.query(`SELECT * FROM Usuario WHERE Persona_id_persona = '${id_persona}'`, (err, data) =>{
                    if (err) {
                        res.send('Ocurrio un error en la busqueda' + err)
                    } else {
                        id_usuario = data[0].ID_USUARIO;
                        celular = data[0].CELULAR;
                        if (rol == 2) {
                            db.query(`SELECT * FROM Estudiante WHERE Usuario_id_usuario = '${id_usuario}'`, (err, data) =>{
                            if (err) {
                                res.send('Ocurrio un error en la busqueda' + err)
                            } else {
                                id_estudiante = data[0].ID_ESTUDIANTE;
                                token = jwt.sign({id_persona, cedula, nombre, id_usuario, celular, id_estudiante, rol},config.secret, { expiresIn: 86400 })
                                res.json({ auth: true, token: token })
                            }
                        });
                        } else {
                            token = jwt.sign({id_persona, cedula, nombre, id_usuario, celular, rol},config.secret, { expiresIn: 86400 })
                            res.json({ auth: true, token: token })
                        }                        
                    }
                });                  
            }
        }
    });
}
module.exports = loginCtrl;