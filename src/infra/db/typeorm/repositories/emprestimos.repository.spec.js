const { emprestimosRepository } = require('./emprestimos.repository');
const { typeormLivrosRepository } = require('./livros.repository');
const { typeormUsuarioRepository } = require('./usuarios.repository');

describe('Emprestimos Repository Typeorm', function () {
  let sut;
  beforeAll(function () {
    sut = emprestimosRepository();
  });

  test('Deve retornar void ao criar um emprestimo', async () => {
    const usuario = await typeormUsuarioRepository.save({
      nome_completo: 'nome_valido',
      CPF: 'CPF_valido',
      telefone: 'telefone_valido',
      email: 'email_valido',
      endereco: 'endereco_valido'
    });
    const livro = await typeormLivrosRepository.save({
      nome: 'nome_valido',
      quantidade: 3,
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    });
    const emprestimoCriado = await sut.emprestar({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2024-01-26',
      data_retorno: '2024-01-28'
    });
    expect(emprestimoCriado).toBeUndefined();
  });
});
