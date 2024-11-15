const { Either, AppError } = require('../shared');
const emprestimosEntity = require('../enterprise/entites/emprestimo.entity');

module.exports = function devolverLivroUseCase({ emprestimoRepository }) {
  if (!emprestimoRepository) throw new AppError(AppError.dependenciasAusentes);
  return async function ({ emprestimo_id, data_devolucao }) {
    if (!emprestimo_id || !data_devolucao)
      throw new AppError(AppError.parametrosObrigratoriosAusentes);
    const { data_retorno } = await emprestimoRepository.devolver({
      emprestimo_id,
      data_devolucao
    });

    const verificarMulta = emprestimosEntity.calcularMulta({ data_retorno, data_devolucao });

    return Either.Right(verificarMulta);
  };
};
