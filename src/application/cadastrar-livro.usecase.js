const { Either, AppError } = require('../shared');

module.exports = function cadastrarLivroUseCase({ livrosRepository }) {
  if (!livrosRepository) {
    throw new AppError(AppError.dependenciasAusentes);
  }
  return async function ({ nome, quantidade, autor, genero, ISBN }) {
    const checkCampos = nome && quantidade && autor && genero && ISBN;
    if (!checkCampos) {
      throw new AppError(AppError.parametrosObrigratoriosAusentes);
    }
    const checkIfExistsISBN = await livrosRepository.existePorISBN(ISBN);
    if (checkIfExistsISBN) {
      return Either.Left(Either.valueAlreadyRegister('ISBN'));
    }
    await livrosRepository.cadastrar({ nome, quantidade, autor, genero, ISBN });

    return Either.Right(null);
  };
};
