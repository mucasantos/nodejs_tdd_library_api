const buscarPendentesFixture = require('../../../tests/fixtures/buscar-pendentes');
const { Either, AppError } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');
const buscarEmprestimosPendentesController = require('./buscar-emprestimos-pendentes.controller');

describe('Buscar Emprestimos pendentes controller', () => {
  const buscarEmprestimosPendentesUseCase = jest.fn();
  test('DEve retornar um http 200 e os emprestimos pendentes', async () => {
    buscarEmprestimosPendentesUseCase.mockResolvedValue(Either.Right(buscarPendentesFixture));
    const response = await buscarEmprestimosPendentesController({
      buscarEmprestimosPendentesUseCase
    });

    expect(response).toEqual(httpResponse(200, buscarPendentesFixture));
  });

  test('Devfe retornar erro se o usecase nao for fornecido', async () => {
    await expect(() => buscarEmprestimosPendentesController({})).rejects.toThrow(
      new AppError(AppError.dependenciasAusentes)
    );
  });
});
