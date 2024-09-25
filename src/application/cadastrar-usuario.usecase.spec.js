//Funcionamento basico do Jest

const AppError = require('../shared/AppError');
const cadastrarUsuarioUseCase = require('./cadastrar-usuario.usecase');

describe('Cadastrar usuario UseCase', function () {
  const usuariosRepository = {
    cadastrar: jest.fn()
  };
  test('Deve poder cadastrar um usuário', async function () {
    const userDto = {
      nome_completo: 'nome_valido',
      CPF: 'cpf_valido',
      endereco: 'endereco_valido',
      email: 'email_valido'
    };

    const sut = cadastrarUsuarioUseCase({ usuariosRepository });
    const output = await sut(userDto);

    expect(output).toBeUndefined();
    expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(userDto);
    expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test('Deve retonar um throw AppError se o usuariosRepository nao for fornecido', function () {
    expect(() => cadastrarUsuarioUseCase({})).toThrow(new AppError(AppError.dependencias));
  });
});
