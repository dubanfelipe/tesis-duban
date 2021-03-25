var express = require('express');
const { request } = require('http');
var db = require('../database');
var bcrypt = require('bcryptjs');

const registerCtrl = {};

registerCtrl.getRegister = (req, res) => {  
    let id=1; 
    db.query(`SELECT p.*, r.* FROM Persona AS p INNER JOIN Rol AS r ON p.Rol_id_rol = r.Id_rol`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Usuarios" + err);
        } else {
            res.json(data);
        }
    });
}

//Persona
registerCtrl.getRegisterByIdPersonaCedula = (req, res) => {   
    let id = req.params.Cedula;
    db.query(`SELECT * FROM Persona WHERE Cedula='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda del Persona" + err);
        } else {
            res.json(data);
        }
    });
}
registerCtrl.getRegisterByIdPersonaActivo = (req, res) => {   
    let id = req.params.Activo;
    db.query(`SELECT * FROM Persona WHERE Activo='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de usuarios Desactivados" + err);
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
        var query = `INSERT INTO Persona (Nombre,Apellido,Correo,Cedula,Activo,Password,Rol_id_rol)
        VALUES ('${usuarios.Nombre}','${usuarios.Apellido}','${usuarios.Correo}','${usuarios.Cedula}','${usuarios.Activo}','${usuarios.Password}','${usuarios.Rol_id_rol}')`;
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
            console.log("PERSONA ELIMINADAAAAAAAAA");
            res.json({message: 'Persona eliminada'});
        }
    });
}
registerCtrl.updateRegisterByIdPersona = (req, res) =>{
    const Id_update = req.params.id_persona;
    const update = req.body;
    var query = `UPDATE Persona SET Nombre = '${update.Nombre}', Apellido ='${update.Apellido}'  WHERE Id_persona = '${Id_update}'`;
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
registerCtrl.getRegisterByIdUsuarioCelular = (req, res) => {   
    let id = req.params.Celular;
    db.query(`SELECT * FROM Usuario WHERE Celular='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda del Usuario" + err);
        } else {
            res.json(data);
        }
    });
}
registerCtrl.getRegisterByIdUsuario = (req, res) => {   
    let id = req.params.Cedula;
    db.query(`SELECT p.*, u.*, s.* FROM Persona AS p INNER JOIN Usuario AS u ON p.Id_persona = u.Persona_id_persona INNER JOIN Sede As s ON s.Id_sede = u.Sede_id_sede WHERE Cedula='${id}'`, (err, data) => {
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
    var query = `INSERT INTO Usuario (Celular,Edad,Estatura,Peso,Rh,Eps,Ingreso,Hora,Dificultades_patologicas,Fecha_nacimiento,Nombre_Acompanante,Celular_Acompanante,Parentesco_Acompanante,Persona_id_persona,Sede_id_sede)
    VALUES ('${usuarios.Celular}','${usuarios.Edad}','${usuarios.Estatura}','${usuarios.Peso}','${usuarios.Rh}','${usuarios.Eps}','${usuarios.Ingreso}','${usuarios.Hora}','${usuarios.Dificultades_patologicas}','${usuarios.Fecha_nacimiento}','${usuarios.Nombre_Acompanante}','${usuarios.Celular_Acompanante}','${usuarios.Parentesco_Acompanante}','${usuarios.Persona_id_persona}','${usuarios.Sede_id_sede}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO USUARIO" + err);
        } else {
            res.json(data);                
        }
    });
}
registerCtrl.deleteRegisterByIdUsuario = (req, res) => {
    let id = req.params.id_usuario;
    console.log("en el back llego",id)
    db.query(`DELETE FROM Usuario WHERE Id_usuario= '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error ELIMINANDO Usuario" + err);
        } else {
            console.log("USUARIO ELIMINADAAAAAAAAA");
            res.json({message: 'Usuario eliminado'});
        }
    });
}
registerCtrl.updateRegisterByIdUsuario = (req, res) =>{
    const Id_update = req.params.id_usuario;
    const update = req.body;
    var query = `UPDATE Usuario SET Edad = '${update.Edad}', Estatura ='${update.Estatura}', Peso ='${update.Peso}', Rh ='${update.Rh}', Eps ='${update.Eps}', Dificultades_patologicas ='${update.Dificultades_patologicas}', Fecha_nacimiento ='${update.Fecha_nacimiento}', Nombre_Acompanante ='${update.Nombre_Acompanante}', Celular_Acompanante ='${update.Celular_Acompanante}', Parentesco_Acompanante ='${update.Parentesco_Acompanante}' WHERE Id_usuario = '${Id_update}'`;
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
    let id = req.params.Cedula;
    db.query(`SELECT p.*, u.*, e.* FROM Persona AS p INNER JOIN Usuario AS u ON p.Id_persona = u.Persona_id_persona INNER JOIN Estudiante AS e ON u.Id_usuario = e.Usuario_id_usuario WHERE Cedula='${id}'`, (err, data) => {
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
            console.log("ESTUDIANTE ELIMINADAAAAAAAAA");
            res.json({message: 'Estudiante eliminado'});
        }
    });
}
registerCtrl.updateRegisterByIdEstudiante = (req, res) =>{
    const Id_update = req.params.id_estudiante;
    const update = req.body;
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

// Facultades
registerCtrl.getFacultades = (req, res) => {
    db.query(`SELECT * FROM Facultad`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Facultades" + err);
        } else {
            res.json(data);
        }
    });
}

//Roles 
registerCtrl.getRoles = (req, res) => {
    db.query(`SELECT * FROM Rol`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Rol" + err);
        } else {
            res.json(data);
        }
    });
}

//Sede
registerCtrl.getSede = (req, res) => {
    db.query(`SELECT * FROM Sede`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Sedes" + err);
        } else {
            res.json(data);
        }
    });
}

module.exports = registerCtrl;
