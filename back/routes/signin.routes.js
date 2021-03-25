const express = require('express');
const router = express.Router();
const signinCtrl = require('../controllers/signin.controller')

router.put('/ingreso/:id', signinCtrl.updateEstadoByIdUsuario);
router.get('/ingreso/Activate/:Ingreso', signinCtrl.getRegisterByIdUsuarioIngreso);

module.exports = router;