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
    let id_usuario;
    db.query(`SELECT * FROM Users WHERE cedula = '${cedula}'`, (err, data) => {
        if (err) { 
            res.send('Ocurrio un error en la busqueda' + err) 
        } 
        else {
            if (data.length == 0) {
                console.log("no existe");
                res.json({ fail: 1 });
            } else if (bcrypt.compareSync(password, data[0].PASSWORD) != 1) {
                res.json({ fail: 2 })
                console.log("diferentes");
            } else{
                console.log("correcto");
                id_usuario = data[0].ID_USERS;
                nombre = data[0].NOMBRE;
                token = jwt.sign({id_usuario, nombre},config.secret, { expiresIn: 86400 })
                res.json({ auth: true, token: token })
            }
        }
    });
}
module.exports = loginCtrl;