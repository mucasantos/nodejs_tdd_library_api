const { Either } = require('../shared');

module.exports = function devolverLivroUseCase({ emprestimoRepository }) {
  return async function ({ emprestimo_id, data_devolucao }) {
    await emprestimoRepository.devolver({
      emprestimo_id,
      data_devolucao
    });

    const verificarMulta = 'Multa por atraso: R$ 0';

    return Either.Right(verificarMulta);
  };
};
