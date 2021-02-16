var express = require('express');
const { request} = require('http');
var db = require('../database');

const registerCtrl = {};

registerCtrl.getRegister = (req, res) => {
    db.query(`SELECT * FROM Users`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Usuarios" + err);
        } else {
            res.json(data);
        }
    });
}

registerCtrl.getRegisterById = (req, res) => {    
    res.json({text: 'buscando usuario'});
}
registerCtrl.createRegister = (req, res) => {
    //let users = req.body;
    console.log(req.body); 
    res.json({text: 'creando usuario'});
}
registerCtrl.deleteRegisterById = (req, res) =>{
    res.json({text: 'eliminando usuario'});
}
registerCtrl.updateRegisterById = (req, res) =>{
    res.json({text: 'editando usuario'});
}

module.exports = registerCtrl;