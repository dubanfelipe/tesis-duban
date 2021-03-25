const express = require('express');
const emailCtrl = require('../controllers/email.controller');
const router = express.Router();

router.post('/formulario',emailCtrl.postFormulario);

module.exports = router;