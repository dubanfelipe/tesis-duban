const express = require('express');
const registerCtrl = require('../controllers/register.controller');
const router = express.Router();

router.get('/', registerCtrl.getRegister);
router.get('/:id_users', registerCtrl.getRegisterById);
router.post('/createRegister', registerCtrl.createRegister);
router.delete('/:id_users', registerCtrl.deleteRegisterById);
router.put('/:id_users', registerCtrl.updateRegisterById);

module.exports = router;
