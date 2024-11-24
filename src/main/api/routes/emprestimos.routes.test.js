const {
  typeormLivrosRepository
} = require('../../../infra/db/typeorm/repositories/livros.repository');
const {
  typeormUsuarioRepository
} = require('../../../infra/db/typeorm/repositories/usuarios.repository');
const request = require('supertest');
const { app } = require('../app');
const {
  typeormEmprestimoRepository
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository');

describe('Emprestimos Routes', function () {
  beforeEach(async function () {
    await typeormEmprestimoRepository.query('DELETE FROM emprestimos');
    await typeormLivrosRepository.query('DELETE FROM livros');
    await typeormUsuarioRepository.query('DELETE FROM usuarios');
  });
  test('Deve ser possivel emprestar um livro', async () => {
    const livro = await typeormLivrosRepository.save({
      nome: 'nome_valido',
      quantidade: 3,
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    });

    const usuario = await typeormUsuarioRepository.save({
      nome_completo: 'nome_valido',
      CPF: '123.123.123-12',
      endereco: 'end_valido',
      telefone: 'tel_valido',
      email: 'mucasantos@icloud.com'
    });

    const { statusCode, body } = await request(app).post('/emprestimos').send({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-15',
      data_retorno: '2024-02-16'
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });
});
