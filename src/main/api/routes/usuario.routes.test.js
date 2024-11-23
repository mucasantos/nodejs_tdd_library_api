const request = require('supertest');
const { app } = require('../app');
const {
  typeormUsuarioRepository
} = require('../../../infra/db/typeorm/repositories/usuarios.repository');

describe('Usuarios Routes', function () {
  beforeEach(async function () {
    await typeormUsuarioRepository.query('Delete from usuarios');
  });
  test('Deve ser possivel cadastrar um user', async () => {
    const { statusCode, body } = await request(app).post('/usuarios').send({
      nome_completo: 'nome_valido',
      CPF: '123.123.123-12',
      endereco: 'end_valido',
      telefone: 'tel_valido',
      email: 'email_valido@email.com'
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });
});
