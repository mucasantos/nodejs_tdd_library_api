const { AppError, Either } = require('../shared');
const cadastrarLivroUseCase = require('./cadastrar-livro.usecase');

describe('Cadastrar Livro UseCase', function () {
  const livrosRepository = {
    cadastrar: jest.fn(),
    existePorISBN: jest.fn()
  };
  test('Deve poder cadastrar um livro', async function () {
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    };

    const sut = cadastrarLivroUseCase({ livrosRepository });
    const output = await sut(livroDTO);

    expect(output.right).toBeNull();
    expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livroDTO);
    expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um trhow Apperror se o livrosRepository nao for fornecidor', function () {
    expect(() => cadastrarLivroUseCase({})).toThrow(new AppError(AppError.dependenciasAusentes));
  });

  test('Deve retornar um throw AppError caso nao passe os parametros obrigadorios', async function () {
    const sut = cadastrarLivroUseCase({ livrosRepository });

    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigratoriosAusentes)
    );
  });

  test('Deve retornar um Either.Left.valorJaCadastrado se um ISBN cadastrado para um livro', async function () {
    livrosRepository.existePorISBN.mockResolvedValue(true);

    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    };

    const sut = cadastrarLivroUseCase({ livrosRepository });
    const output = await sut(livroDTO);

    expect(output.left).toEqual(Either.valueAlreadyRegister('ISBN'));

    expect(livrosRepository.existePorISBN).toHaveBeenCalledWith(livroDTO.ISBN);
    expect(livrosRepository.existePorISBN).toHaveBeenCalledTimes(1);
  });
});
