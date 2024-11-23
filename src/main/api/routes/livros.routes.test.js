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

  test('Deve ser possível buscar um livro por nome', async () => {
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 3,
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    };
    await typeormLivrosRepository.save(livroDTO);

    const { statusCode, body } = await request(app).get('/livros').query({ valor: 'nome_valido' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual(expect.objectContaining(livroDTO));
  });

  test('Deve ser possível buscar um livro por ISBN', async () => {
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 3,
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido'
    };

    //Aqui não tem o save, pois este teste está lendo o livro que foi salvo no teste anterior!
    const { statusCode, body } = await request(app).get('/livros').query({ valor: 'ISBN_valido' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual(expect.objectContaining(livroDTO));
  });
  test('DEve retornar um array vazio se buscar por nopme ou isbn e nao encontrar', async () => {
    //Aqui não tem o save, pois este teste está lendo o livro que foi salvo no teste anterior!
    const { statusCode, body } = await request(app)
      .get('/livros')
      .query({ valor: 'ISBN_qualquer' });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(0);
  });

  test('Deve retornar um erro se ao cadastrar, os campos obrigatorio estiverm ausentes', async () => {
    const { statusCode, body } = await request(app).post('/livros').send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Erro de validação');

    expect(body.error.fieldErrors).toEqual({
      nome: ['Nome é obrigatporio'],
      quantidade: ['Quantidade é obrigatoria'],
      autor: ['Autor é obrigatporio'],
      genero: ['GEnero é obrigatporio'],
      ISBN: ['ISBN é obrigatporio']
    });
  });
  test('Deve retornar um erro se o campo obrigatorio valor nao for fornecido', async () => {
    const { statusCode, body } = await request(app).get('/livros');
    expect(statusCode).toBe(400);
    expect(body.message).toBe('Erro de validação');

    expect(body.error.fieldErrors).toEqual({
      valor: ['Valor é obrigatorio']
    });
  });
});
