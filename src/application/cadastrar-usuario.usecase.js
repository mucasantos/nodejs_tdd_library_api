const AppError = require('../shared/AppError');

module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }) {
  if (!usuariosRepository) throw new AppError(AppError.dependenciasAusentes);
  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    const checkCampos = nome_completo && CPF && telefone && endereco && email;
    if (!checkCampos) throw new AppError(AppError.parametrosObrigratoriosAusentes);
    await usuariosRepository.cadastrar({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email
    });
  };
};
