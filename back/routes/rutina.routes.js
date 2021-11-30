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
router.delete('/EjercicioHasRutina/Ejercicio/delete/:Id_ejercicio',RutinaCtrl.deleteEjercicioHas);

//Rutina completa
router.post('/Rutinacompleta/create', RutinaCtrl.createRutinacompleta);
router.get('/Rutinacompleta/get', RutinaCtrl.getRutinaCompleta);
router.get('/Rutinacompleta/getById/:Id_rutina', RutinaCtrl.getRutinaCompletaById);
router.delete('/Rutinacompleta/delete/:Id_rutina', RutinaCtrl.deleteRutinacompleta);

//RutinaCompleta has Persona
router.post('/RutinaCompletaHasPersona/create', RutinaCtrl.createRutinacompletaHasPersona);
router.delete('/RutinaCompletaHasPersona/delete/:Id_rutina',RutinaCtrl.deleteRutinaCompletaHasPersona);
router.delete('/RutinaCompletaHas/delete/:Id_persona',RutinaCtrl.deleteRutinaCompletaHas)

module.exports = router;