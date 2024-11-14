const { Either } = require('../shared');
const AppError = require('../shared/AppError');

module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }) {
  if (!usuariosRepository) throw new AppError(AppError.dependenciasAusentes);
  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    const checkCampos = nome_completo && CPF && telefone && endereco && email;
    if (!checkCampos) throw new AppError(AppError.parametrosObrigratoriosAusentes);

    const checkUserCPF = await usuariosRepository.existByCPF(CPF);
    if (checkUserCPF) return Either.Left(Either.valueAlreadyRegister('CPF'));

    const checkUserEmail = await usuariosRepository.existByEmail(email);
    if (checkUserEmail) return Either.Left(Either.valueAlreadyRegister('Email'));

    await usuariosRepository.cadastrar({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email
    });
    return Either.Right(null);
  };
};
