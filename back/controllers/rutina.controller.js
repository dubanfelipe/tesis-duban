var express = require('express');
const { request } = require('http');
var db = require('../database');

const RutinaCtrl = {};

//Ejercicio
RutinaCtrl.createEjercicio = (req, res) => {
    ejercicio = req.body;    
    var query = `INSERT INTO Ejercicio (Nombre,Serie,Repeticion,Tiempo_descanso)
    VALUES ('${ejercicio.Nombre}','${ejercicio.Serie}','${ejercicio.Repeticion}','${ejercicio.Tiempo_descanso}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO EJERCICIO" + err);
        } else {
            res.json(data);                
        }
    });
}
RutinaCtrl.deleteEjercicio = (req, res) => {
    let id = req.params.Id_ejercicio;
    db.query(`DELETE FROM Ejercicio WHERE Id_ejercicio= '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error ELIMINANDO Ejercicio" + err);
        } else {
            res.json({message: 'Ejericio eliminado'});
        }
    });
}
RutinaCtrl.updateEjercicio = (req, res) => {
    const Id_update = req.params.Id_ejercicio;
    const update = req.body;
    var query = `UPDATE Ejercicio SET Nombre = '${update.Nombre}', Serie ='${update.Serie}', Repeticion ='${update.Repeticion}', Tiempo_descanso ='${update.Tiempo_descanso}'  WHERE Id_ejercicio = '${Id_update}'`;
    try {
        db.query(query, (err, data) => {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error actualizando el ejericio" + err);
            } else {
                res.json(data);
            }
        });
    } catch (E) {
        console.log('error', E);
        res.json({message: 'error en el servidor actualizando el ejercicio' })
    }
}
RutinaCtrl.getEjercicioById = (req, res) => {
    let id = req.params.Id_ejercicio;
    db.query(`SELECT * FROM Ejercicio WHERE Id_ejercicio='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Ejercicios" + err);
        } else {
            res.json(data);
        }
    });
}
RutinaCtrl.getEjercicio = (req, res) => {
    db.query(`SELECT * FROM Ejercicio`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Ejercicios" + err);
        } else {
            res.json(data);
        }
    });
}

//Rutina
RutinaCtrl.createRutina = (req, res) => {
    rutina = req.body;    
    var query = `INSERT INTO Rutina (Nombre,Dia_rutina,Persona_id_persona)
    VALUES ('${rutina.Nombre}','${rutina.Dia_rutina}','${rutina.Persona_id_persona}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO RUTINAS" + err);
        } else {
            res.json(data);                
        }
    });
}
RutinaCtrl.deleteRutina = (req, res) => {
    let id = req.params.Id_rutina;
    db.query(`DELETE FROM Rutina WHERE Id_rutina= '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error ELIMINANDO Rutina" + err);
        } else {
            res.json({message: 'Rutina eliminada'});
        }
    });
}
RutinaCtrl.updateRutina = (req, res) => {
    const Id_update = req.params.Id_rutina;
    const update = req.body;
    var query = `UPDATE Rutina SET Nombre = '${update.Nombre}', Dia_rutina ='${update.Dia_rutina}' WHERE Id_rutina = '${Id_update}'`;
    try {
        db.query(query, (err, data) => {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error actualizando el ejericio" + err);
            } else {
                res.json(data);
            }
        });
    } catch (E) {
        console.log('error', E);
        res.json({message: 'error en el servidor actualizando el ejercicio' })
    }
}
RutinaCtrl.getRutinaById = (req, res) => {
    let id = req.params.Id_rutina;
    db.query(`SELECT * FROM Rutina WHERE Id_rutina='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Rutina" + err);
        } else {
            res.json(data);
        }
    });
}
RutinaCtrl.getRutina = (req, res) => {
    db.query(`SELECT * FROM Rutina`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Rutina" + err);
        } else {
            res.json(data);
        }
    });
}

module.exports = RutinaCtrl;