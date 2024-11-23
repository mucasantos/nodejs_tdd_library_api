const { Router } = require('express');
const cadastrarUsuariosCompose = require('../composers/cadastrar-usuarios.compose');
const buscarUsuarioPorCpfCompose = require('../composers/buscar-usuario-por-cpf.compose');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body
  };

  const { statusCode, body } = await cadastrarUsuariosCompose(httpRequest);

  return response.status(statusCode).json(body);
});

usuariosRoutes.get('/cpf/:cpf', async (request, response) => {
  const httpRequest = {
    params: request.params
  };

  const { statusCode, body } = await buscarUsuarioPorCpfCompose(httpRequest);

  return response.status(statusCode).json(body);
});

module.exports = { usuariosRoutes };
