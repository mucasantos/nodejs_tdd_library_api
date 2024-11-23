const buscarUsuarioPorCpfUsecase = require('../../../application/buscar-usuario-por-cpf.usecase');
const {
  usuariosRepository
} = require('../../../infra/db/typeorm/repositories/usuarios.repository');
const buscarUsuarioPorCpfController = require('../../../interface-adapters/controllers/buscar-usuario-por-cpf.controller');

module.exports = async function buscarUsuarioPorCPFCompose({ httpRequest }) {
  const usurioRepositoryFn = usuariosRepository();
  const buscarUsuarioPorCPFUseCaseFn = buscarUsuarioPorCpfUsecase({
    usuariosRepository: usurioRepositoryFn
  });
  const controller = await buscarUsuarioPorCpfController({
    buscarUsuarioPorCpfUseCase: buscarUsuarioPorCPFUseCaseFn,
    httpRequest
  });

  return controller;
};
