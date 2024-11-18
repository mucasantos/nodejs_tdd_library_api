const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');
const cadastrarUsuarioController = require('./cadastrar-usuario.controller');

describe('Cadastrar Usuario Controller', function () {
  const cadastrarUsuarioUseCase = jest.fn();
  test('Deve cadastrar Usuario', async () => {
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        nome_completo: 'nome_valido',
        CPF: '123.123.123-00',
        telefone: 'telefone_valido',
        email: 'email_valido@email.com',
        endereco: 'endereco_valido'
      }
    };

    const response = await cadastrarUsuarioController({ cadastrarUsuarioUseCase, httpRequest });
    expect(response).toEqual(httpResponse(201, null));
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  });
  test('Deve retornar um throw AppError se o cadastroUsuarioUseCAse e httpRequest nao for nornecido', () => {
    expect(() => cadastrarUsuarioController({})).rejects.toThrow(
      new AppError(AppError.dependenciasAusentes)
    );
  });

  test('DEve retornar um httpREsponse 400 e error.message se o cadastro de user nao for realizado com sucesso por logica do usercase', async () => {
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Left({ message: 'Lógica inválida' }));
    const httpRequest = {
      body: {
        nome_completo: 'nome_valido',
        CPF: '123.123.123-00',
        telefone: 'telefone_valido',
        email: 'email_valido@email.com',
        endereco: 'endereco_valido'
      }
    };

    const response = await cadastrarUsuarioController({ cadastrarUsuarioUseCase, httpRequest });
    expect(response).toEqual(httpResponse(400, 'Lógica inválida'));
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retonar um erro do zod validator se der erro na validação dos dados', () => {
    const httpRequest = {
      body: {}
    };
    expect(() =>
      cadastrarUsuarioController({ cadastrarUsuarioUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
