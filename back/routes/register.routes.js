const express = require('express');
const registerCtrl = require('../controllers/register.controller');
const router = express.Router();

router.get('/', registerCtrl.getRegister);
//Persona
router.get('/Persona/:Cedula', registerCtrl.getRegisterByIdPersonaCedula);
router.post('/Persona/createRegisterPersona', registerCtrl.createRegisterPersona);
router.delete('/Persona/:id_persona', registerCtrl.deleteRegisterByIdPersona);
router.put('/Persona/:id_persona', registerCtrl.updateRegisterByIdPersona);
router.get('/Persona/Activate/:Activo', registerCtrl.getRegisterByIdPersonaActivo);
//Usuario
router.get('/Usuario/Celular/:Celular', registerCtrl.getRegisterByIdUsuarioCelular);
router.get('/Usuario/:Cedula', registerCtrl.getRegisterByIdUsuario);
router.post('/Usuario/createRegisterUsuario', registerCtrl.createRegisterUsuario);
router.delete('/Usuario/:id_usuario', registerCtrl.deleteRegisterByIdUsuario);
router.put('/Usuario/:id_usuario', registerCtrl.updateRegisterByIdUsuario);
//Estudiante
router.get('/Estudiante/:Cedula', registerCtrl.getRegisterByIdEstudiante);
router.post('/Estudiante/createRegisterEstudiante', registerCtrl.createRegisterEstudiante);
router.delete('/Estudiante/:id_estudiante', registerCtrl.deleteRegisterByIdEstudiante);
router.put('/Estudiante/:id_estudiante', registerCtrl.updateRegisterByIdEstudiante);
//Facultades
router.get('/Facultades', registerCtrl.getFacultades);
//Rol
router.get('/Roles', registerCtrl.getRoles);

module.exports = router;
