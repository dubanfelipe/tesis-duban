var express = require('express');
var db = require('../database');
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var keygen = require("keygenerator");
var config = require('../models/config');
var jwt = require('jsonwebtoken');
const login = require('../libs/login');

const signinCtrl = {};

signinCtrl.updateEstadoByIdUsuario = (req, res) => {
    const { id } = req.params;
    const sede = req.body.Sede_id_sede;
    const ingreso = req.body.Ingreso; 
    const hora = req.body.Hora; 
    console.log(req.body);  
    var query = `UPDATE Usuario SET Sede_id_sede ='${sede}', Ingreso = '${ingreso}', Hora = '${hora}' WHERE Id_usuario='${id}' `;
    try {
        db.query(query, (err, data) => {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error actualizando el usuario" + err);
            } else {
                res.json(data);
            }
        });
    } catch (E) {
        console.log('error', E);
        res.json({message: 'error en el servidor actualizando el usuario' })
    }
}
signinCtrl.getRegisterByIdUsuarioIngreso = (req, res) => {
    let id = req.params.Ingreso;
    db.query(`SELECT p.*, u.*, s.* FROM Persona AS p INNER JOIN Usuario AS u ON p.Id_persona = u.Persona_id_persona INNER JOIN Sede As s ON s.Id_sede = u.Sede_id_sede WHERE Ingreso='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de usuarios ha ingresar" + err);
        } else {
            res.json(data);
        }
    });
}

module.exports = signinCtrl;