const { usuariosRepository, typeormUsuarioRepository } = require('./usuarios.repository');

describe('Usuarios Repository', function () {
  beforeEach(async function () {
    await typeormUsuarioRepository.delete({});
  });
  test('Deve retornar void ao criar um usuario', async () => {
    const sut = usuariosRepository();

    const usuarioCriado = await sut.cadastrar({
      nome_completo: 'nome_valido',
      CPF: 'CPF_valido',
      telefone: 'telefone_valido',
      email: 'email_valido',
      endereco: 'endereco_valido'
    });

    expect(usuarioCriado).toBeUndefined();
  });
  test('Deve retornar um usuario por CPF, caso exista', async () => {
    await typeormUsuarioRepository.save({
      nome_completo: 'nome_valido',
      CPF: 'CPF_valido',
      telefone: 'telefone_valido',
      email: 'email_valido',
      endereco: 'endereco_valido'
    });
    const sut = usuariosRepository();

    const buscarPorCPFCadastrado = await sut.buscarPorCPF('CPF_valido');
    expect(buscarPorCPFCadastrado.id).toBeDefined();
    expect(buscarPorCPFCadastrado.nome_completo).toBe('nome_valido');
  });

  test('Deve retornar null de o usuario com cpf nao existir', async () => {
    const sut = usuariosRepository();

    const buscarPorCPFCadastrado = await sut.buscarPorCPF('CPF_nao_Cadastrado');
    expect(buscarPorCPFCadastrado).toBeNull();
  });
});
