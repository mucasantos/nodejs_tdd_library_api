const { AppError, Either } = require('../shared');

module.exports = function emprestarLivroUseCase({ emprestimoRepository, emailService }) {
  if (!emprestimoRepository || !emailService) throw new AppError(AppError.dependenciasAusentes);
  return async function ({ usuario_id, livro_id, data_saida, data_retorno }) {
    const checkCampos = usuario_id && livro_id && data_saida && data_retorno;

    if (!checkCampos) throw new AppError(AppError.parametrosObrigratoriosAusentes);

    if (data_saida.getTime() > data_retorno.getTime())
      return Either.Left(Either.dataRetornoMenorQueDataSaida);

    const existLivroISBNEmprestadoPendenteUsuario =
      await emprestimoRepository.existeLivroISBNEmprestadoPendenteUsuario({ usuario_id, livro_id });
    if (existLivroISBNEmprestadoPendenteUsuario)
      return Either.Left(Either.existLivroISBNEmprestadoPendenteUsuario);
    const id = await emprestimoRepository.emprestar({
      usuario_id,
      livro_id,
      data_saida,
      data_retorno
    });
    const { usuario, livro } = await emprestimoRepository.buscarEmprestimoComLivroComUserPorID(id);

    await emailService.enviarEmail({
      data_saida,
      data_retorno,
      nome_usuario: usuario.nome_completo,
      CPF: usuario.CPF,
      email: usuario.email,
      nome_livro: livro.nome
    });
    return Either.Right(null);
  };
};
