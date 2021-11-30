const express = require('express');
const estadisticasCtrl = require('../controllers/estadisticas.controller');
const router = express.Router();

router.get('/Grafica/getGrafica/:diaLetra', estadisticasCtrl.getEstadisticasDiaLetra);
router.get('/Grafica/getGraficaMes/:mes', estadisticasCtrl.getEstadisticasMes)
router.post('/Grafica/createGrafica', estadisticasCtrl.createEstadisticas);

module.exports = router;