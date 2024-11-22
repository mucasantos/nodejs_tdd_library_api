const { Either, AppError } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');
const buscarLivroPorNomeOuISBNController = require('./buscar-livro-por-nome-ou-isbn');
describe('Buscar licro por nome ou ISBN Controller', function () {
  const buscarLivroPorNomeOuISBNUseCase = jest.fn();

  test('Deve retornar um httpRespnse e os licros se forem encontrados com o valor informado', async () => {
    const livroDTO = [
      {
        id: 'qualquer_id',
        nome: 'qualquer_id',
        quantidade: 1,
        autor: 'qualquer_id',
        genero: 'qualquer_id',
        ISBN: 'qualquer_id'
      }
    ];
    buscarLivroPorNomeOuISBNUseCase.mockResolvedValue(Either.Right(livroDTO));
    const httpRequest = {
      query: {
        valor: 'nome_valido'
      }
    };

    const response = await buscarLivroPorNomeOuISBNController({
      buscarLivroPorNomeOuISBNUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(200, livroDTO));
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledWith(httpRequest.query);
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um httpRespnse e os e array vazio se nao forem encontrados com o valor informado', async () => {
    buscarLivroPorNomeOuISBNUseCase.mockResolvedValue(Either.Right([]));
    const httpRequest = {
      query: {
        valor: 'nome_valido'
      }
    };

    const response = await buscarLivroPorNomeOuISBNController({
      buscarLivroPorNomeOuISBNUseCase,
      httpRequest
    });

    expect(response).toEqual(httpResponse(200, []));
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledWith(httpRequest.query);
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw Apperror se o buscarlivro e httpreq nao forem fornecidos', () => {
    expect(() => buscarLivroPorNomeOuISBNController({})).rejects.toThrow(
      new AppError(AppError.dependenciasAusentes)
    );
  });
});
