const { Either } = require('../shared');

module.exports = function buscarUsuarioPorCPFUseCase({ userRepository }) {
  return async function ({ CPF }) {
    const usuario = await userRepository.buscarPorCPF(CPF);
    return Either.Right(usuario);
  };
};
