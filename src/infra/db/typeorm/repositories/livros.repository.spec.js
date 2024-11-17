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
});
