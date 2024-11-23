const {
  typeormLivrosRepository
} = require('../../../infra/db/typeorm/repositories/livros.repository');
const { app } = require('../app');

const request = require('supertest');
describe('Livros Routes', function () {
  beforeAll(async function () {
    await typeormLivrosRepository.query('DELETE FROM livros');
  });
  test('Deve ser possível cadastrar um livro', async () => {
    const { statusCode, body } = await request(app).post('/livros').send({
      nome: 'qualquer_nome',
      quantidade: 3,
      autor: 'qualquer_nome',
      genero: 'qualquer_nome',
      ISBN: 'qualquer_nome'
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull;
  });
});
