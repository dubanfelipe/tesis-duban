var express = require('express');

const inicioCtrl = {};

inicioCtrl.getinicio = (req, res) => {
    res.send('Hello word')
}

module.exports = inicioCtrl;