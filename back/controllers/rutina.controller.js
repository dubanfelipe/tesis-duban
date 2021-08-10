var express = require('express');
const { request } = require('http');
var db = require('../database');

const RutinaCtrl = {};

//Ejercicio
RutinaCtrl.createEjercicio = (req, res) => {
    console.log(req.body);
    ejercicio = req.body;    
    var query = `INSERT INTO Ejercicio (Nombre,Serie,Repeticion,Tiempo_descanso,Musculos_id_musculos)
    VALUES ('${ejercicio.NOMBRE}','${ejercicio.SERIE}','${ejercicio.REPETICION}','${ejercicio.TIEMPO_DESCANSO}','${ejercicio.NOMBRE_MUSCULOS}')`;
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
    var query = `UPDATE Ejercicio SET Nombre = '${update.NOMBRE}', Serie ='${update.SERIE}', Repeticion ='${update.REPETICION}', Tiempo_descanso ='${update.TIEMPO_DESCANSO}', Musculos_id_musculos ='${update.NOMBRE_MUSCULOS}'  WHERE Id_ejercicio = '${Id_update}'`;
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
    db.query(`SELECT e.*,m.* FROM Ejercicio AS e INNER JOIN Musculos AS m ON e.Musculos_id_musculos = m.Id_musculos`, (err, data) => {
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
    let listaRutina = [];    
    var query = `INSERT INTO Rutina (Nombre,Dia_rutina)
    VALUES ('${rutina.Nombre}','${rutina.Dia_rutina}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO RUTINAS" + err);
        } else {
            db.query(`SELECT * FROM Rutina WHERE Nombre='${rutina.Nombre}'`, (err, data) => {
                if (err) {
                    res.json({ error: err });
                    console.log("Hubo un error en la busqueda de Rutina" + err);
                } else {
                    listaRutinas=data;
                    for (let index = 0; index < listaRutinas.length; index++) {
                        listaRutina[0] = listaRutinas[index];                        
                    }
                    res.json(listaRutina[0].ID_RUTINA);
                }
            });               
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

//Musculos
RutinaCtrl.getMusculos = (req, res) => {
    db.query(`SELECT * FROM Musculos`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Musculos" + err);
        } else {
            res.json(data);
        }
    });
}
RutinaCtrl.createMusculos = (req, res) => {
    id = req.body.Id_musculos;
    musculos = req.body.Nombre_musculos;
    var query = `INSERT INTO Musculos (Id_musculos,Nombre_musculos)
    VALUES ('${id}','${musculos}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
        } else {
            res.json(data);                
        }
    });
}

//Ejercicio has Rutina
RutinaCtrl.createEjercicioHasRutina = (req, res) => {
    id_ejercicio = req.body.Id_ejercicio;
    id_rutina = req.body.Id_rutina;
    var query = `INSERT INTO Ejercicio_has_rutina (Ejercicio_id_ejercicio, Rutina_id_rutina)
    VALUES ('${id_ejercicio}','${id_rutina}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO HAS" + err);
        } else {
            res.json(data);                
        }
    });
}
RutinaCtrl.deleteEjercicioHasRutina = (req, res) => { 
    id_ejercicio = req.params.Id_ejercicio;
    id_rutina = req.params.Id_rutina;
    db.query(`DELETE FROM Ejercicio_has_rutina WHERE (Ejercicio_id_ejercicio= '${id_ejercicio}') AND (Rutina_id_rutina= '${id_rutina}')`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error ELIMINANDO Rutina" + err);
        } else {
            res.json({message: 'Conexion eliminada'});
        }
    });
}
RutinaCtrl.getEjercicioHasRutina = (req, res) => { 
    console.log(req.params);
    let id_rutina = req.params.Id_rutina;
    db.query(`SELECT e.*, h.*, m.* FROM Ejercicio_has_rutina AS h INNER JOIN Ejercicio AS e ON h.Ejercicio_id_ejercicio = e.Id_ejercicio INNER JOIN Musculos AS m ON e.Musculos_id_musculos = m.Id_musculos WHERE Rutina_id_rutina= '${id_rutina}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Rutina" + err);
        } else {
            res.json(data);
        }
    });
}

//Rutina completa
RutinaCtrl.createRutinacompleta = (req, res) => { 
    console.log(req.body);
    rutina = req.body;
    var query = `INSERT INTO Rutina_completa (Nombre_Rutina,Id_rutinalunes,Id_rutinamartes,Id_rutinamiercoles,Id_rutinajueves,Id_rutinaviernes,Id_rutinasabado)
    VALUES ('${rutina.Nombre_Rutina}','${rutina.Id_rutinalunes}','${rutina.Id_rutinamartes}','${rutina.Id_rutinamiercoles}','${rutina.Id_rutinajueves}','${rutina.Id_rutinaviernes}','${rutina.Id_rutinasabado}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO RUTINACOMPLETA" + err);
        } else {
            res.json(data);                
        }
    });
}

RutinaCtrl.getRutinaCompleta = (req, res) => {
    db.query(`SELECT * FROM Rutina_completa`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Musculos" + err);
        } else {
            res.json(data);
        }
    });
}

RutinaCtrl.getRutinaCompletaById = (req, res) => {
    console.log(req.params);
    let id_rutina = req.params.Id_rutina;
    db.query(`SELECT * FROM Rutina_completa WHERE Id_rutinacompleta='${id_rutina}'`,(err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de RutinaCompleta" + err);
        } else {
            res.json(data);
        }
    });
}

//Rutinacompleta Has Persona
RutinaCtrl.createRutinacompletaHasPersona = (req, res) => {
    console.log("el req.body", req.body);
    id_rutinaCompleta = req.body.Id_rutinacompleta;
    id_persona = req.body.Id_persona;
    var query = `INSERT INTO RutinaCompleta_has_persona (RutinaCompleta_id_rutinacompleta, Persona_id_persona)
    VALUES ('${id_rutinaCompleta}','${id_persona}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO HAS" + err);
        } else {
            res.json(data);                
        }
    });
}
module.exports = RutinaCtrl;