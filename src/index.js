'use strict';

const http = require('http');
const express = require('express');
const cors = require('cors');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serverPort = 8081;
require('custom-env').env(process.env.NODE_ENV)

// swaggerRouter Configuración
var options = {
  swaggerUi: '/swagger.json',
  controllers: './src/controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Condicional para activar los stubs (mock mode)
};
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Swagger doc
var spec = fs.readFileSync('./src/api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Iniciar Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpretar los recursos de Swagger y adjuntar metadatos para solicitar
  app.use(middleware.swaggerMetadata());

	app.use(cors());

  // Validar las solicitudes de Swagger
  app.use(middleware.swaggerValidator());

  // Enruta las solicitudes validadas al controlador apropiado
  app.use(middleware.swaggerRouter(options));

  // Sirve los documentos Swagger y Swagger UI
  app.use(middleware.swaggerUi());

  // Inicia el servidor
  http.createServer(app).listen(serverPort, function () {
    console.log('Tu servidor está escuchando en el puerto %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui está disponible en http://localhost:%d/docs', serverPort);
  });
});
