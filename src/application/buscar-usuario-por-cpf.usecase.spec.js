const { AppError } = require('../shared');
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

  test('Deve retornar null caso o CPF não exista', async function () {
    userRepository.buscarPorCPF.mockResolvedValue(null);

    const cpfDTO = {
      CPF: 'CPF_nao_cadastrado'
    };

    const sut = buscarUsuarioPorCpfUsecase({ userRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toBeNull();
    expect(userRepository.buscarPorCPF).toHaveBeenCalledWith(cpfDTO.CPF);
    expect(userRepository.buscarPorCPF).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o usuarioRepository nao for fornecido', function () {
    expect(() => buscarUsuarioPorCpfUsecase({})).toThrow(
      new AppError(AppError.dependenciasAusentes)
    );
  });

  test('Deve retornar um throw AppError se o CPF nao for fornecido', async function () {
    const sut = buscarUsuarioPorCpfUsecase({ userRepository });

    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigratoriosAusentes)
    );
  });
});
