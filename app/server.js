'use strict'
require('dotenv').config();
var app = require('./app');
var port = process.env.APP_PORT;


//Creacion del servidor
var server = app.listen(port, () => {
  console.log("Servidor corriendo correctamente en la url: http://localhost:" + process.env.APP_PORT);
});

server.timeout = 120000;


