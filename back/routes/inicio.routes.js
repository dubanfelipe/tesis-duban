const express = require('express');
const inicioCtrl = require('../controllers/inicio.controller');
const router = express.Router();

router.get('/', inicioCtrl.getinicio);

module.exports = router;