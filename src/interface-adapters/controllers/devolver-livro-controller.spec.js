const { Either } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');
const devolverLivroController = require('./devolver-livro-controller');

describe('DEvolver livro controller', function () {
  const devolverLivroUseCase = jest.fn();
  test('DEve retonar uma msg se ao devolver um livro informando um multa ou nao', async () => {
    devolverLivroUseCase.mockResolvedValue(Either.Right('Multa por atraso: R$ 0'));

    const httpRequest = {
      body: {
        data_devolucao: '2024-02-14'
      },
      params: {
        emprestimo_id: '1'
      }
    };
    const response = await devolverLivroController({
      devolverLivroUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(200, 'Multa por atraso: R$ 0'));
    expect(devolverLivroUseCase).toHaveBeenCalledWith({
      ...httpRequest.body,
      ...httpRequest.params
    });
    expect(devolverLivroUseCase).toHaveBeenCalledTimes(1);
  });
});
