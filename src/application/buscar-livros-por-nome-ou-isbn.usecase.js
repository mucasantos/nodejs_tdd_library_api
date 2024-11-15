const { Either, AppError } = require('../shared');

module.exports = function buscarLivrosPorNomeOuISBNUseCase({ livrosRepository }) {
  if (!livrosRepository) {
    throw new AppError(AppError.dependenciasAusentes);
  }
  return async function ({ valor }) {
    if (!valor) {
      throw new AppError(AppError.parametrosObrigratoriosAusentes);
    }
    const livros = await livrosRepository.buscarPorNomeOuISBN(valor);
    return Either.Right(livros);
  };
};
