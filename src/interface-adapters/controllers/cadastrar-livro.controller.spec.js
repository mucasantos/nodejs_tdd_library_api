const { ZodError } = require('zod');
const { Either, AppError } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');
const cadastrarLivroController = require('./cadastrar-livro.controller');

describe('Cadastrar livro Controller', async function () {
  const cadastrarLivroUseCase = jest.fn();

  test('Deve retornar um httpREsponse 201 e null se o livro for cadastrado com sucesso', async () => {
    cadastrarLivroUseCase.mockResolvedValue(Either.Right(null));

    const httpRequest = {
      body: {
        nome: 'qualquer_nome',
        quantidade: 1,
        autor: 'qualquer_autor',
        genero: 'qualquer_genero',
        ISBN: 'qualquer_ISBN'
      }
    };

    const response = await cadastrarLivroController({ cadastrarLivroUseCase, httpRequest });

    expect(response).toEqual(httpResponse(201, null));
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1);
  });
  test('Deve retornar um httpREsponse 400 e msg se o livro nao for cadastrado com sucesso', async () => {
    cadastrarLivroUseCase.mockResolvedValue(Either.Left({ message: 'validacao_invalida' }));

    const httpRequest = {
      body: {
        nome: 'qualquer_nome',
        quantidade: 1,
        autor: 'qualquer_autor',
        genero: 'qualquer_genero',
        ISBN: 'qualquer_ISBN'
      }
    };

    const response = await cadastrarLivroController({ cadastrarLivroUseCase, httpRequest });

    expect(response).toEqual(httpResponse(400, 'validacao_invalida'));
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw apperror se o usecase e httpreq nao forem fornecidos', async () => {
    await expect(() => cadastrarLivroController({})).rejects.toThrow(
      new AppError(AppError.dependenciasAusentes)
    );
  });

  test('Deve retornar erro do Zod se nao enviar dados obrigadorios', async () => {
    const httpRequest = {
      body: {}
    };

    await expect(() =>
      cadastrarLivroController({ cadastrarLivroUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
