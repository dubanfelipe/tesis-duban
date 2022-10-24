const express = require ('express');
const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json());

const libs = require('./libs');
libs.forEach(lib => require(`./libs/${lib}`)(app));