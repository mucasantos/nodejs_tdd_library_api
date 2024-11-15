const { AppError, Either } = require('../shared');

module.exports = function emprestarLivroUseCase({ emprestimoRepository }) {
  if (!emprestimoRepository) throw new AppError(AppError.dependenciasAusentes);
  return async function ({ usuario_id, livro_id, data_saida, data_retorno }) {
    const checkCampos = usuario_id && livro_id && data_saida && data_retorno;

    if (!checkCampos) throw new AppError(AppError.parametrosObrigratoriosAusentes);

    if (data_saida.getTime() > data_retorno.getTime())
      return Either.Left(Either.dataRetornoMenorQueDataSaida);

    const existLivroISBNEmprestadoPendenteUsuario =
      await emprestimoRepository.existLivroISBNEmprestadoPendenteUsuario({ usuario_id, livro_id });
    if (existLivroISBNEmprestadoPendenteUsuario)
      return Either.existLivroISBNEmprestadoPendenteUsuario;
    await emprestimoRepository.emprestar({
      usuario_id,
      livro_id,
      data_saida,
      data_retorno
    });

    return Either.Right(null);
  };
};
