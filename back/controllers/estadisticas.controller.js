var express = require('express');
const { request } = require('http');
var db = require('../database');
var bcrypt = require('bcryptjs');

const estadisticasCtrl = {};

estadisticasCtrl.getEstadisticasDiaLetra = (req, res) => {  
    let id = req.params.diaLetra;
    db.query(`SELECT hora, SUM(CASE WHEN sede = 'Sede principal' THEN 1 ELSE 0 END) as cant01, SUM(CASE WHEN sede = 'Edificio Dr Angelico' THEN 1 ELSE 0 END) as cant02, SUM(CASE WHEN sede = 'Campus San Alberto Magno' THEN 1 ELSE 0 END) as cant03 FROM Estadisticas WHERE diaLetra = '${id}' GROUP BY hora ORDER BY hora`, (err, data) =>{
        if (err) {
            res.json({ error: err });
        } else {
            res.json(data);
        }
    })
}

estadisticasCtrl.getEstadisticasMes = (req, res) => {  
    let id = req.params.mes;
    db.query(`SELECT diaNumero, SUM(CASE WHEN sede = 'Sede principal' THEN 1 ELSE 0 END) as cant01, SUM(CASE WHEN sede = 'Edificio Dr Angelico' THEN 1 ELSE 0 END) as cant02, SUM(CASE WHEN sede = 'Campus San Alberto Magno' THEN 1 ELSE 0 END) as cant03 FROM Estadisticas WHERE mes = '${id}' GROUP BY diaNumero ORDER BY diaNumero`, (err, data) =>{
        if (err) {
            res.json({ error: err });
        } else {
            res.json(data);
        }
    })
}

estadisticasCtrl.createEstadisticas = (req, res) => {
    estadisticas = req.body;    
    var query = `INSERT INTO Estadisticas (diaNumero, diaLetra, mes, sede, ano, hora)
    VALUES ('${estadisticas.diaNumero}','${estadisticas.diaLetra}','${estadisticas.mes}','${estadisticas.sede}','${estadisticas.ano}', '${estadisticas.hora}')`;
    db.query(query, function(err, data) {
    if (err) {
            res.json({ error: err });
            console.log("Hubo un error INSERTANDO ESTADISTICAS" + err);
        } else {
            res.json(data);                
        }
    });
}

module.exports = estadisticasCtrl;