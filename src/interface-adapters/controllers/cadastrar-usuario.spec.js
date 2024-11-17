const { Either } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');
const cadastrarUsuarioController = require('./cadastrar-usuario.controller');

describe('Cadastrar Usuario Controller', function () {
  const cadastrarUsuarioUseCase = jest.fn();
  test('should first', async () => {
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        nome_completo: 'nome_valido',
        CPF: 'CPF_valido',
        telefone: 'telefone_valido',
        email: 'email_valido',
        endereco: 'endereco_valido'
      }
    };

    const response = await cadastrarUsuarioController({ cadastrarUsuarioUseCase, httpRequest });
    expect(response).toEqual(httpResponse(201, null));
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  });
});
