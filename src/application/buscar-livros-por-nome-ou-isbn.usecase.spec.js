const { AppError } = require('../shared');
const buscarLivrosPorNomeOuIsbnUsecase = require('./buscar-livros-por-nome-ou-isbn.usecase');

describe('Buscar livros por nome ou ISBN UseCase', function () {
  const livrosRepository = {
    buscarPorNomeOuISBN: jest.fn()
  };
  test('DEve retornar um livro valido ao buscar por nome ou ISBN existente', async function () {
    const nomeISBNBTO = {
      valor: 'valor_valido'
    };
    const outputDTO = [
      {
        id: 'id_valido',
        nome: 'valor_valido',
        quantidade: 'quantidade_valida',
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'valor_valido'
      }
    ];
    livrosRepository.buscarPorNomeOuISBN.mockResolvedValue(outputDTO);

    const sut = buscarLivrosPorNomeOuIsbnUsecase({ livrosRepository });
    const output = await sut(nomeISBNBTO);

    expect(output.right).toEqual(outputDTO);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(nomeISBNBTO.valor);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um array vazio quando nao existir um livro ou ISBN informado', async function () {
    livrosRepository.buscarPorNomeOuISBN.mockResolvedValue([]);

    const nomeISBNBTO = {
      valor: 'valor_nao_cadastrado'
    };

    const sut = buscarLivrosPorNomeOuIsbnUsecase({ livrosRepository });
    const output = await sut(nomeISBNBTO);

    expect(output.right).toEqual([]);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(nomeISBNBTO.valor);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o livrosRepository nao for fornecido', function () {
    expect(() => buscarLivrosPorNomeOuIsbnUsecase({})).toThrow(
      new AppError(AppError.dependenciasAusentes)
    );
    n;
  });

  test('Deve retornar erro se campos obrigatorios nao forem enviados', async function () {
    const sut = buscarLivrosPorNomeOuIsbnUsecase({ livrosRepository });

    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigratoriosAusentes)
    );
  });
});
