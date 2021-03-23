const express = require('express');
const router = express.Router();
const AutenticarUsuariosCtrl = require('../controllers/autenticarusuarios.controller')

router.put('/changeStatus/:id', AutenticarUsuariosCtrl.changeStatus);

module.exports = router;