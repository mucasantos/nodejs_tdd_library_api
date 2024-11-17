const { usuariosRepository, typeormUsuarioRepository } = require('./usuarios.repository');

describe('Usuarios Repository', function () {
  let sut;

  beforeEach(async function () {
    await typeormUsuarioRepository.delete({});
  });

  beforeAll(function () {
    sut = usuariosRepository();
  });
  const usuarioDto = {
    nome_completo: 'nome_valido',
    CPF: 'CPF_valido',
    telefone: 'telefone_valido',
    email: 'email_valido',
    endereco: 'endereco_valido'
  };
  test('Deve retornar void ao criar um usuario', async () => {
    const usuarioCriado = await sut.cadastrar(usuarioDto);

    expect(usuarioCriado).toBeUndefined();
  });
  test('Deve retornar um usuario por CPF, caso exista', async () => {
    await typeormUsuarioRepository.save(usuarioDto);
    const sut = usuariosRepository();

    const buscarPorCPFCadastrado = await sut.buscarPorCPF('CPF_valido');
    expect(buscarPorCPFCadastrado.id).toBeDefined();
    expect(buscarPorCPFCadastrado.nome_completo).toBe('nome_valido');
  });

  test('Deve retornar null de o usuario com cpf nao existir', async () => {
    const buscarPorCPFCadastrado = await sut.buscarPorCPF('CPF_nao_Cadastrado');
    expect(buscarPorCPFCadastrado).toBeNull();
  });

  test('Deve retornar true se existir um user por email', async () => {
    await typeormUsuarioRepository.save(usuarioDto);

    const existPorCPF = await sut.existPorCPF('CPF_valido');

    expect(existPorCPF).toBe(true);
  });

  test('Deve retornar false se NAO existir um user por email', async () => {
    await typeormUsuarioRepository.save(usuarioDto);

    const existPorCPF = await sut.existPorCPF('CPF_invalido');

    expect(existPorCPF).toBe(false);
  });
});
