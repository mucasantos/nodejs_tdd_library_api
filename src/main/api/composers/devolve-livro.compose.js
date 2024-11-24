const devolverLivroUsecase = require('../../../application/devolver-livro.usecase');
const {
  emprestimosRepository
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository');
const devolverLivroController = require('../../../interface-adapters/controllers/devolver-livro-controller');

module.exports = async function devolverLivroCompose(httpRequest) {
  const emprestimosRepositoryFn = emprestimosRepository();
  const devolverLivroCaseFn = devolverLivroUsecase({
    emprestimoRepository: emprestimosRepositoryFn
  });
  const controller = await devolverLivroController({
    devolverLivroUseCase: devolverLivroCaseFn,
    httpRequest
  });

  return controller;
};
