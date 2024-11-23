require('express-async-errors');
const express = require('express');
const { routes } = require('./routes');
const { ZodError } = require('zod');
const app = express();

//Configs
app.use(express.json());

//Routes
app.use(routes);

//Error Handler
app.use(function (error, request, response, next) {
  if (error instanceof ZodError) {
    return response.status(400).json({ message: 'Erro de validação', error: error.flatten() });
  }
  if (process.env.NODE !== 'production') {
    console.log(error);
  }
  return response.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = { app };
