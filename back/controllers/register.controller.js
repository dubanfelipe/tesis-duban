var express = require('express');
const { request } = require('http');
var db = require('../database');
var bcrypt = require('bcryptjs');

const registerCtrl = {};

registerCtrl.getRegister = (req, res) => {
    db.query(`SELECT * FROM Persona`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Usuarios" + err);
        } else {
            res.json(data);
        }
    });
}

//Persona

registerCtrl.getRegisterByIdPersona = (req, res) => {   
    let id = req.params.Cedula;
    console.log("Estamosss aquiiiiiii",id);
    db.query(`SELECT * FROM Persona WHERE Cedula='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda del Persona" + err);
        } else {
            res.json(data);
        }
    });
}

registerCtrl.createRegisterPersona = async (req, res) => {
    console.log("usuarios que llego :", req.body);
    usuarios = req.body;
    bcrypt.hash(usuarios.Password,10,function(err,data){
        if(data){
            usuarios.Password=data;
            console.log("Password encriptado ",usuarios.Password);            
        }else{
            console.log("Hubo un error ENCRIPTANDOCLAVE" + err);
        }  
        var query = `INSERT INTO Persona (Nombre,Apellido,Correo,Cedula,Celular,Password,Rol_id_rol)
        VALUES ('${usuarios.Nombre}','${usuarios.Apellido}','${usuarios.Correo}','${usuarios.Cedula}','${usuarios.Celular}','${usuarios.Password}','${usuarios.Rol_id_rol}')`;
        db.query(query, function(err, data) {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error INSERTANDO USUARIO" + err);
            } else {
                console.log("hecho");
                res.json(data);
            }
        });             
    });    
}

registerCtrl.deleteRegisterByIdPersona = (req, res) =>{
    let id = req.params.id_persona;
    db.query(`DELETE FROM Persona WHERE Id_persona= '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error ELIMINANDO Persona" + err);
        } else {
            res.json({message: 'Persona eliminada'});
        }
    });
}
registerCtrl.updateRegisterByIdPersona = (req, res) =>{
    const Id_update = req.params.id_persona;
    const update = req.body;
    console.log(`dato 1 ${Id_update} id persona ${JSON.stringify(req.body)}`);
    var query = `UPDATE Persona SET Nombre = '${update.Nombre}', Apellido ='${update.Apellido}', Correo ='${update.Correo}', Cedula ='${update.Cedula}', Celular ='${update.Celular}'  WHERE Id_persona = '${Id_update}'`;
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

//Usuario

registerCtrl.getRegisterByIdUsuario = (req, res) => {   
    let id = req.params.id_usuario;
    db.query(`SELECT * FROM Usuario WHERE Id_usuario='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda del Usuario" + err);
        } else {
            res.json(data);
        }
    });
}

registerCtrl.createRegisterUsuario = async (req, res) => {
    console.log("usuarios que llego :", req.body);
    usuarios = req.body;    
    var query = `INSERT INTO Usuario (Edad,Estatura,Peso,Rh,Eps,Dificultades_patologicas,Fecha_nacimiento,Nombre_Acompanante,Celular_Acompanante,Parentesco_Acompanante,Activo,Persona_id_persona)
    VALUES ('${usuarios.Edad}','${usuarios.Estatura}','${usuarios.Peso}','${usuarios.Rh}','${usuarios.Eps}','${usuarios.Dificultades_patologicas}','${usuarios.Fecha_nacimiento}','${usuarios.Nombre_Acompanante}','${usuarios.Celular_Acompanante}','${usuarios.Parentesco_Acompanante}','${usuarios.Activo}','${usuarios.Persona_id_persona}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO USUARIO" + err);
        } else {
            res.json(data);                
        }
    });
}

registerCtrl.deleteRegisterByIdUsuario = (req, res) =>{
    let id = req.params.id_usuario;
    db.query(`DELETE FROM Usuario WHERE Id_usuario= '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error ELIMINANDO Usuario" + err);
        } else {
            res.json({message: 'Usuario eliminado'});
        }
    });
}
registerCtrl.updateRegisterByIdUsuario = (req, res) =>{
    const Id_update = req.params.id_usuario;
    const update = req.body;
    console.log(`dato 1 ${Id_update} id usuario ${JSON.stringify(req.body)}`);
    var query = `UPDATE Usuario SET Edad = '${update.Edad}', Estatura ='${update.Estatura}', Peso ='${update.Peso}', Rh ='${update.Rh}', Eps ='${update.Eps}', Dificultades_patologicas ='${update.Dificultades_patologicas}', Fecha_nacimiento ='${update.Fecha_nacimiento}', Nombre_Acompanante ='${update.Nombre_Acompanante}', Celular_Acompanante ='${update.Celular_Acompanante}', Parentesco_Acompanante ='${update.Parentesco_Acompanante}', Activo ='${update.Activo}'  WHERE Id_usuario = '${Id_update}'`;
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

//Estudiante

registerCtrl.getRegisterByIdEstudiante = (req, res) => {   
    let id = req.params.id_estudiante;
    db.query(`SELECT * FROM Estudiante WHERE Id_estudiante='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda del Estudiante" + err);
        } else {
            res.json(data);
        }
    });
}

registerCtrl.createRegisterEstudiante = async (req, res) => {
    console.log("usuarios que llego :", req.body);
    usuarios = req.body;    
    var query = `INSERT INTO Estudiante (Codigo,Semestre,Usuario_id_usuario,Facultad_id_facultad)
    VALUES ('${usuarios.Codigo}','${usuarios.Semestre}','${usuarios.Usuario_id_usuario}','${usuarios.Facultad_id_facultad}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO Estudiante" + err);
        } else {
            res.json(data);                
        }
    });
}

registerCtrl.deleteRegisterByIdEstudiante = (req, res) =>{
    let id = req.params.id_estudiante;
    db.query(`DELETE FROM Estudiante WHERE Id_estudiante= '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error ELIMINANDO Estudiante" + err);
        } else {
            res.json({message: 'Estudiante eliminado'});
        }
    });
}
registerCtrl.updateRegisterByIdEstudiante = (req, res) =>{
    const Id_update = req.params.id_estudiante;
    const update = req.body;
    console.log(`dato 1 ${Id_update} id estudiante ${JSON.stringify(req.body)}`);
    var query = `UPDATE Estudiante SET Codigo = '${update.Codigo}', Semestre ='${update.Semestre}'  WHERE Id_estudiante = '${Id_update}'`;
    try {
        db.query(query, (err, data) => {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error actualizando el estudiante" + err);
            } else {
                res.json(data);
            }
        });
    } catch (E) {
        console.log('error', E);
        res.json({message: 'error en el servidor actualizando el estudiante' })
    }
}

module.exports = registerCtrl;
