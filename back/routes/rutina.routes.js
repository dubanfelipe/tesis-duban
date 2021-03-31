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

module.exports = router;