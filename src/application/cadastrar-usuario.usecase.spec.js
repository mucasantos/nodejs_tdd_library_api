//Funcionamento basico do Jest

const { Either } = require('../shared');
const AppError = require('../shared/AppError');
const cadastrarUsuarioUseCase = require('./cadastrar-usuario.usecase');

describe('Cadastrar usuario UseCase', function () {
  const usuariosRepository = {
    cadastrar: jest.fn(),
    existPorCPF: jest.fn(),
    existPorEmail: jest.fn()
  };
  test('Deve poder cadastrar um usuário', async function () {
    const userDto = {
      nome_completo: 'nome_valido',
      CPF: 'cpf_valido',
      endereco: 'endereco_valido',
      email: 'email_valido',
      telefone: '123123123'
    };

    const sut = cadastrarUsuarioUseCase({ usuariosRepository });
    const output = await sut(userDto);

    expect(output.right).toBeNull();
    expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(userDto);
    expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test('Deve retonar um throw AppError se o usuariosRepository nao for fornecido', function () {
    expect(() => cadastrarUsuarioUseCase({})).toThrow(new AppError(AppError.dependenciasAusentes));
  });

  test('Deve retornar um throw AppErro se os campos obrigatórios nao forem fornecidos', async function () {
    const sut = cadastrarUsuarioUseCase({ usuariosRepository });

    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigratoriosAusentes)
    );
  });

  test('Deve retornar um Either.left se o CPF já existir', async function () {
    //Esse mock é porque preciso do retorno do repositorio q ainda nao existe
    usuariosRepository.existPorCPF.mockReturnValue(true);

    const userDto = {
      nome_completo: 'nome_valido',
      CPF: 'cpf_ja_cadastrado',
      endereco: 'endereco_valido',
      email: 'email_valido',
      telefone: 'telefone_valido'
    };

    const sut = cadastrarUsuarioUseCase({ usuariosRepository });
    const output = await sut(userDto);

    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueAlreadyRegister('CPF'));
    expect(usuariosRepository.existPorCPF).toHaveBeenLastCalledWith(userDto.CPF);
    expect(usuariosRepository.existPorCPF).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um Either.left se o Email já existir', async function () {
    //Esse mock é porque preciso do retorno do repositorio q ainda nao existe
    usuariosRepository.existPorEmail.mockReturnValue(true);
    usuariosRepository.existPorCPF.mockReturnValue(false); //PResico mockar este para pode "passar pra frente"

    const userDto = {
      nome_completo: 'nome_valido',
      CPF: 'cpf_valido',
      endereco: 'endereco_valido',
      email: 'email_ja_cadastrado',
      telefone: 'telefone_valido'
    };

    const sut = cadastrarUsuarioUseCase({ usuariosRepository });
    const output = await sut(userDto);

    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueAlreadyRegister('Email'));
    expect(usuariosRepository.existPorEmail).toHaveBeenLastCalledWith(userDto.email);
    expect(usuariosRepository.existPorEmail).toHaveBeenCalledTimes(1);
  });
});
