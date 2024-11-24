const emprestarLivrosUsecase = require('../../../application/emprestar-livros.usecase');
const {
  emprestimosRepository
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository');
const nodemailerService = require('../../../infra/email/nodemailer');
const emprestarLivroController = require('../../../interface-adapters/controllers/emprestar-livro-controller');

module.exports = async function emprestarLivrosCompose(httpRequest) {
  const emprestimosRepositoryFn = emprestimosRepository();
  const emailServiceFn = nodemailerService();
  const emprestarLivrosUseCaseFn = emprestarLivrosUsecase({
    emprestimoRepository: emprestimosRepositoryFn,
    emailService: emailServiceFn
  });

  const controller = await emprestarLivroController({
    emprestarLivroUseCase: emprestarLivrosUseCaseFn,
    httpRequest
  });

  return controller;
};
