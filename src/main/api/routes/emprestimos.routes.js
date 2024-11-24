const { Router } = require('express');
const emprestarLivrosCompose = require('../composers/emprestar-livros.compose');
const devolveLivroCompose = require('../composers/devolve-livro.compose');

const emprestimosRoutes = Router();

emprestimosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };
  const { statusCode, body } = await emprestarLivrosCompose(httpRequest);

  return response.status(statusCode).json(body);
});

emprestimosRoutes.put('/devolver/:emprestimo_id', async (request, response) => {
  const httpRequest = {
    body: request.body,
    params: request.params
  };

  const { statusCode, body } = await devolveLivroCompose(httpRequest);

  return response.status(statusCode).json(body);
});

module.exports = { emprestimosRoutes };
