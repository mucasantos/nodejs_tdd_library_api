const cadastrarLivroUsecase = require('../../../application/cadastrar-livro.usecase');
const { livrosRepository } = require('../../../infra/db/typeorm/repositories/livros.repository');
const cadastrarLivroController = require('../../../interface-adapters/controllers/cadastrar-livro.controller');

module.exports = async function cadastarLivroCompose(httpRequest) {
  const livrosRepositoryFn = livrosRepository();
  const cadastrarLivrosUseCaseFn = cadastrarLivroUsecase({ livrosRepository: livrosRepositoryFn });
  const controller = await cadastrarLivroController({
    cadastrarLivroUseCase: cadastrarLivrosUseCaseFn,
    httpRequest
  });
  return controller;
};
