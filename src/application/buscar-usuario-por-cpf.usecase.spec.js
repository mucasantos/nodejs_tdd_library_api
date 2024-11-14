const buscarUsuarioPorCpfUsecase = require('./buscar-usuario-por-cpf.usecase');

describe('Buscar usuario por CPF UseCase', function () {
  const userRepository = {
    buscarPorCPF: jest.fn()
  };

  test('Deve retornar um usuario caso o CPF esteja cadastrado', async function () {
    const cpfDTO = {
      CPF: 'CPF_cadastrado'
    };

    const outputDTO = {
      id: 'qualquer_ID',
      nome: 'qualquer_nome',
      CPF: 'CPF_cadastrado',
      telefone: 'qualquer_telefone',
      email: 'qualquer_email'
    };

    userRepository.buscarPorCPF.mockResolvedValue(outputDTO);

    const sut = buscarUsuarioPorCpfUsecase({ userRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toEqual(outputDTO);
    expect(userRepository.buscarPorCPF).toHaveBeenCalledWith(cpfDTO.CPF);
    expect(userRepository.buscarPorCPF).toHaveBeenCalledTimes(1);
  });
});
