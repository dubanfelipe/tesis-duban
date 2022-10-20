var express = require('express');
var db = require('../database');
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var keygen = require("keygenerator");
var config = require('../models/config');
var jwt = require('jsonwebtoken');
const login = require('../libs/login');

const AutenticarUsuariosCtrl = {};

AutenticarUsuariosCtrl.changeStatus = (req, res) => {

    const { id } = req.params;
    const activo = req.body.status;
    db.query(`UPDATE Persona SET activo='${activo}' WHERE Id_persona='${id}' `, (err, data) => {
        if (err) {
            res.json({ status: false });
            console.log("Hubo un error actualizando el status asesoria" + err);
        } else {
            res.json({ status: true });
        }
    });
}

module.exports = AutenticarUsuariosCtrl;