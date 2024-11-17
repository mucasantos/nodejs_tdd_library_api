const { livrosRepository, typeormLivrosRepository } = require('./livros.repository');

describe('Livros Repository TypeORM', function () {
  let sut;

  beforeAll(function () {
    sut = livrosRepository();
  });
  beforeEach(async function () {
    await typeormLivrosRepository.delete({});
  });
  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 3,
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido'
  };

  test('Deve retornar void ao criar um livro', async () => {
    const livroCriado = await sut.cadastrar(livroDTO);

    expect(livroCriado).toBeUndefined();
  });

  test('DEve retornar true se existir um livro por ISBN', async () => {
    await typeormLivrosRepository.save(livroDTO);
    const existePorISBN = await sut.existePorISBN('ISBN_valido');

    expect(existePorISBN).toBe(true);
  });

  test('DEve retornar false se existir um livro por ISBN', async () => {
    await typeormLivrosRepository.save(livroDTO);
    const existePorISBN = await sut.existePorISBN('ISBN_invalido');

    expect(existePorISBN).toBe(false);
  });

  test('Deve retornar um livro completo se buscar por nome', async function () {
    await typeormLivrosRepository.save(livroDTO);

    const buscarPorNomeOuISBN = await sut.buscarPorNomeOuISBN('nome_valido');

    expect(buscarPorNomeOuISBN).toHaveLength(1);
    expect(buscarPorNomeOuISBN[0].nome).toBe('nome_valido');
  });

  test('Deve retornar um livro se buscar por isbn', async () => {
    await typeormLivrosRepository.save(livroDTO);

    const buscarPorISBN = await sut.buscarPorNomeOuISBN('nome_valido');

    expect(buscarPorISBN).toHaveLength(1);
    expect(buscarPorISBN[0].ISBN).toBe('ISBN_valido');
  });
});
