const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');
const emprestarLivroController = require('./emprestar-livro-controller');

describe('Emprestar livro Controller', function () {
  const emprestarLivroUseCase = jest.fn();
  test('Deve ser possivel emprestar um livro', async () => {
    emprestarLivroUseCase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        livro_id: 1,
        usuario_id: 1,
        data_saida: '2024-02-03',
        data_retorno: '2024-02-15'
      }
    };
    const response = await emprestarLivroController({
      emprestarLivroUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(emprestarLivroUseCase).toHaveBeenLastCalledWith({
      livro_id: 1,
      usuario_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date)
    });
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1);
  });
  test('Deve ser possivel emprestar um livro', async () => {
    emprestarLivroUseCase.mockResolvedValue(Either.Left({ message: 'validacao_invalida' }));
    const httpRequest = {
      body: {
        livro_id: 1,
        usuario_id: 1,
        data_saida: '2024-02-03',
        data_retorno: '2024-02-15'
      }
    };
    const response = await emprestarLivroController({
      emprestarLivroUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(400, 'validacao_invalida'));
    expect(emprestarLivroUseCase).toHaveBeenLastCalledWith({
      livro_id: 1,
      usuario_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date)
    });
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um erro de o emprestarlivro usecase e o httpReq nao seja fornecido', () => {
    expect(() => emprestarLivroController({})).rejects.toThrow(
      new AppError(AppError.dependenciasAusentes)
    );
  });

  test('Deve retornar erro do Zod se nao enviar algum campo obrigatorio', () => {
    const httpRequest = {
      body: {}
    };

    expect(() =>
      emprestarLivroController({ emprestarLivroUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
