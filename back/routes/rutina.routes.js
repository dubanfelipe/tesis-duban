const express = require('express');
const router = express.Router();
const RutinaCtrl = require('../controllers/rutina.controller')

//Ejercicio
router.post('/Ejercicio/createEjercicio', RutinaCtrl.createEjercicio);
router.delete('/Ejercicio/:Id_ejercicio', RutinaCtrl.deleteEjercicio);
router.put('/Ejercicio/:Id_ejercicio', RutinaCtrl.updateEjercicio);
router.get('/Ejercicio/:Id_ejercicio', RutinaCtrl.getEjercicioById);
router.get('/Ejercicio', RutinaCtrl.getEjercicio);

//Rutina
router.post('/Rutina/createRutina', RutinaCtrl.createRutina);
router.delete('/Rutina/:Id_rutina', RutinaCtrl.deleteRutina);
router.put('/Rutina/:Id_rutina', RutinaCtrl.updateRutina);
router.get('/Rutina/:Id_rutina', RutinaCtrl.getRutinaById);
router.get('/Rutina', RutinaCtrl.getRutina);

//Musculos
router.get('/Musculos', RutinaCtrl.getMusculos);
router.post('/Musculos/createMusculos', RutinaCtrl.createMusculos);

//Ejercicio has Rutina
router.post('/EjercicioHasRutina/create', RutinaCtrl.createEjercicioHasRutina);
router.delete('/EjercicioHasRutina/delete/:Id_ejercicio/:Id_rutina',RutinaCtrl.deleteEjercicioHasRutina);
router.get('/EjercicioHasRutina/:Id_rutina', RutinaCtrl.getEjercicioHasRutina);

//Rutina completa
router.post('/Rutinacompleta/create', RutinaCtrl.createRutinacompleta);
router.get('/Rutinacompleta/get', RutinaCtrl.getRutinaCompleta);

//RutinaCompleta has Persona
router.post('/RutinaCompletaHasPersona/create', RutinaCtrl.createRutinacompletaHasPersona);

module.exports = router;