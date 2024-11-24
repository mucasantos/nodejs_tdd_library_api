const { Router } = require('express');
const emprestarLivrosCompose = require('../composers/emprestar-livros.compose');

const emprestimosRoutes = Router();

emprestimosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };
  const { statusCode, body } = await emprestarLivrosCompose(httpRequest);

  return response.status(statusCode).json(body);
});

emprestimosRoutes.put('/devolver/:id');

module.exports = { emprestimosRoutes };
