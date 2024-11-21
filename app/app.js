'use strict'
require('dotenv').config();
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
var expressreqid  = require('node-express-req-id')({
  type: 'cuid'  // `uuid` or `cuid`
});


var app = express();

//cargar archivos de rutas
var web_routes = require('./routes/web');

// Configurar cabeceras y cors
app.use(cors());

//middlewares
app.use(bodyParser.urlencoded({
  extended:false
}));

app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '50mb',
  extended:false
}));

//Errores en el json
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 400, message: err.message });
    }
    next();
});

//Error en el formato de la url
app.use(function(req, res, next) {
    var err = null;
    try {
        decodeURIComponent(req.path)
    }
    catch(e) {
        err = e;
    }
    if (err){
        return res.status(400).send({ status: 400, message: err.message });
    }
    next();
});

//xml
app.use(
  bodyParser.xml({
    limit: '5MB', // Reject payload bigger than 1 MB
    xmlParseOptions: {
      normalize: true, // Trim whitespace inside text nodes
      normalizeTags: true, // Transform tags to lowercase
      explicitArray: false, // Only put nodes in array if >1
    },
  }),
);

//request id
app.use(expressreqid);

//Ruta de status de express
app.use(require('express-status-monitor')());

//Rutas estaticas
app.use('/pdf', express.static(__dirname + '/storage/pdf/hojasseguridadtecnicas'));
app.use('/products', express.static(__dirname + '/storage/products'));
app.use('/resources', express.static(__dirname + '/public/resources'));
app.use(express.static('public'));
// app.use('/donbot/admin', express.static(__dirname+'/public/html/admin/index.html'));

// front ejs
app.set('view engine', 'ejs')

//rutas
// app.use('', routes);
app.use('/donbot/', web_routes);

//exportar
module.exports = app;
