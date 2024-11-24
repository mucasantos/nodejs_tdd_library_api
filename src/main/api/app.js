require('express-async-errors');
const express = require('express');
const { routes } = require('./routes');
const { ZodError } = require('zod');
const { typeormServer } = require('../../infra/db/typeorm/setup');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { sendMailQueue } = require('../../infra/queue/bull');

const app = express();

// QUEUE Monitor

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/queues');

createBullBoard({
  queues: [new BullAdapter(sendMailQueue)],
  serverAdapter
});

//Configs
app.use(express.json());

typeormServer
  .initialize()
  .then(() => {
    //Routes
    app.use(routes);

    app.use('/queues', serverAdapter.getRouter());

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
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = { app };
