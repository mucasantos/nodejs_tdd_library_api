const { AppError, Either } = require('../shared');

module.exports = function buscarEmprestimosPendentesUseCase({ emprestimosRepository }) {
  if (!emprestimosRepository) throw new AppError(AppError.dependenciasAusentes);

  return async function () {
    const emprestimosPendentes = await emprestimosRepository.buscarEmprestimosPententesComUser();
    return Either.Right(emprestimosPendentes);
  };
};
