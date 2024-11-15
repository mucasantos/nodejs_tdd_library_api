const { Either, AppError } = require('../shared');

module.exports = function devolverLivroUseCase({ emprestimoRepository }) {
  if (!emprestimoRepository) throw new AppError(AppError.dependenciasAusentes);
  return async function ({ emprestimo_id, data_devolucao }) {
    const { data_retorno } = await emprestimoRepository.devolver({
      emprestimo_id,
      data_devolucao
    });

    const verificarDataRetorno =
      new Date(data_retorno).getTime() > new Date(data_devolucao).getTime();

    console.log(verificarDataRetorno);

    const verificarMulta = verificarDataRetorno
      ? 'Multa por atraso: R$ 10,00'
      : 'Multa por atraso: R$ 0';

    return Either.Right(verificarMulta);
  };
};
