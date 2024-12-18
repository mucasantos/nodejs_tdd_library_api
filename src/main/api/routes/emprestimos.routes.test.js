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

  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 3,
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido'
  };

  const usuarioDTO = {
    nome_completo: 'nome_valido',
    CPF: '123.123.123-12',
    endereco: 'end_valido',
    telefone: 'tel_valido',
    email: 'mucasantos@icloud.com.s'
  };
  test('Deve ser possivel emprestar um livro', async () => {
    const livro = await typeormLivrosRepository.save(livroDTO);

    const usuario = await typeormUsuarioRepository.save(usuarioDTO);

    const { statusCode, body } = await request(app).post('/emprestimos').send({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-15',
      data_retorno: '2024-02-16'
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });

  test('DEve devolver 200 e mensagem de multa aplicada', async () => {
    const livro = await typeormLivrosRepository.save(livroDTO);

    const usuario = await typeormUsuarioRepository.save(usuarioDTO);

    const emprestimo = await typeormEmprestimoRepository.save({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-15',
      data_retorno: '2024-02-16'
    });

    const { statusCode, body } = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({ data_devolucao: '2024-02-16' });

    expect(statusCode).toBe(200);
    expect(body).toBe('Multa por atraso: R$ 0');
  });
  test('DEve devolver 200 e mensagem de multa aplicada', async () => {
    const livro = await typeormLivrosRepository.save(livroDTO);

    const usuario = await typeormUsuarioRepository.save(usuarioDTO);

    const emprestimo = await typeormEmprestimoRepository.save({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2024-02-15',
      data_retorno: '2024-02-16'
    });

    const { statusCode, body } = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({ data_devolucao: '2024-02-17' });

    expect(statusCode).toBe(200);
    expect(body).toBe('Multa por atraso: R$ 10,00');
  });

  test('Deve retornar as mensagens de erro do ZOD', async () => {
    const { statusCode, body } = await request(app).put(`/emprestimos/devolver/3`).send({});

    expect(statusCode).toBe(400);
    expect(body.error.fieldErrors).toEqual({
      data_devolucao: ['Data devolução obrigaoria']
    });
  });

  test('DEve devolver os emprestismo pendentes', async () => {
    const livro = await typeormLivrosRepository.save(livroDTO);

    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    await typeormEmprestimoRepository.save([
      {
        livro_id: livro.id,
        usuario_id: usuario.id,
        data_saida: '2024-02-15',
        data_retorno: '2024-02-16',
        data_devolucao: '2024-02-16'
      },
      {
        livro_id: livro.id,
        usuario_id: usuario.id,
        data_saida: '2024-02-17',
        data_retorno: '2024-02-18'
      }
    ]);

    const { statusCode, body } = await request(app).get('/emprestimos');

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
  });
});
