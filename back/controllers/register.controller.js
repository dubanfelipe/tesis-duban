var express = require('express');
const { request} = require('http');
var db = require('../database');
var bcrypt = require('bcryptjs');

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
    let id = req.params.id_users;
    db.query(`SELECT * FROM Users WHERE Id_users='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda del Producto" + err);
        } else {
            res.json(data);
        }
    });
}

registerCtrl.createRegister = async (req, res) => {
    console.log("usuarios que llego :", req.body);
    usuarios = req.body;
    bcrypt.hash(usuarios.Password,10,function(err,data){
        if(data){
            usuarios.Password=data;
            console.log("Password encriptado ",usuarios.Password);            
        }else{
            console.log("Hubo un error ENCRIPTANDOCLAVE" + err);
        }
        var query = `INSERT INTO users (Cedula,Nombre,Codigo,Facultad,Semestre,Ocupacion,Password)
        VALUES ('${usuarios.Cedula}','${usuarios.Nombre}','${usuarios.Codigo}','${usuarios.Facultad}','${usuarios.Semestre}','${usuarios.Ocupacion}','${usuarios.Password}')`;
        db.query(query, function(err, data) {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error INSERTANDO USUARIO" + err);
            } else {
                res.json(data);
            }
        });
    });    
}

registerCtrl.deleteRegisterById = (req, res) =>{
    let id = req.params.id_users;
    db.query(`DELETE FROM Users WHERE Id_users= '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error ELIMINANDO USUARIO" + err);
        } else {
            res.json({message: 'Usuario eliminado'});
        }
    });
}
registerCtrl.updateRegisterById = (req, res) =>{
    const Id_update = req.params.id_users;
    const update = req.body;
    console.log(`dato 1 ${Id_update} id usuarios ${JSON.stringify(req.body)}`);
    var query = `UPDATE Users SET Cedula = '${update.Cedula}', Nombre ='${update.Nombre}', Codigo ='${update.Codigo}', Facultad ='${update.Facultad}', Semestre ='${update.Semestre}', Ocupacion ='${update.Ocupacion}', Password ='${update.Passrowd}'  WHERE Id_users = '${Id_update}'`;
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
        res.json({message: 'error en el servidor actualizando la convocatoria' })
    }
}

module.exports = registerCtrl;