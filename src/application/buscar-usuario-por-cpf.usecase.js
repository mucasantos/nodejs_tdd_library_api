const { Either, AppError } = require('../shared');

module.exports = function buscarUsuarioPorCPFUseCase({ userRepository }) {
  if (!userRepository) {
    throw new AppError(AppError.dependenciasAusentes);
  }

  return async function ({ CPF }) {
    if (!CPF) {
      throw new AppError(AppError.parametrosObrigratoriosAusentes);
    }
    const usuario = await userRepository.buscarPorCPF(CPF);
    return Either.Right(usuario);
  };
};
