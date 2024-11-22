const { Router } = require('express');
const cadastrarUsuariosCompose = require('../composers/cadastrar-usuarios.compose');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };

  const { statusCode, body } = await cadastrarUsuariosCompose(httpRequest);

  return response.status(statusCode).json(body);
});

module.exports = { usuariosRoutes };
