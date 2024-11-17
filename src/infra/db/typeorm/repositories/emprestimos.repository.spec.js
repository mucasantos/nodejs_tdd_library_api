const { existLivroISBNEmprestadoPendenteUsuario } = require('../../../../shared/Either');
const { emprestimosRepository, typeormEmprestimoRepository } = require('./emprestimos.repository');
const { typeormLivrosRepository } = require('./livros.repository');
const { typeormUsuarioRepository } = require('./usuarios.repository');

describe('Emprestimos Repository Typeorm', function () {
  let sut;
  beforeAll(function () {
    sut = emprestimosRepository();
  });

  beforeEach(async function () {
    await typeormEmprestimoRepository.delete({});

    await typeormUsuarioRepository.delete({});
    await typeormLivrosRepository.delete({});
  });

  const usuarioDTO = {
    nome_completo: 'nome_valido',
    CPF: 'CPF_valido',
    telefone: 'telefone_valido',
    email: 'email_valido',
    endereco: 'endereco_valido'
  };
  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 3,
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido'
  };
  test('Deve retornar void ao criar um emprestimo', async () => {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivrosRepository.save(livroDTO);
    const emprestimoCriado = await sut.emprestar({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2024-01-26',
      data_retorno: '2024-01-28'
    });
    expect(emprestimoCriado).toBeUndefined();
  });

  test('Deve retornar a data de retorno salva no DB corretamente', async () => {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivrosRepository.save(livroDTO);
    const emprestimo = await typeormEmprestimoRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2024-01-26',
      data_retorno: '2024-01-28'
    });

    const devolver = await sut.devolver({
      emprestimo_id: emprestimo.id,
      data_devolucao: '2024-01-26'
    });

    expect(devolver.data_retorno).toBe(emprestimo.data_retorno);
  });

  test('Deve atualizar a data de devolucao salva no DB corretamente', async () => {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivrosRepository.save(livroDTO);
    const emprestimo = await typeormEmprestimoRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2024-01-26',
      data_retorno: '2024-01-28'
    });

    const devolver = await sut.devolver({
      emprestimo_id: emprestimo.id,
      data_devolucao: '2024-01-26'
    });
    const buscarEmpresitimoPorID = await typeormEmprestimoRepository.findOneBy({
      id: emprestimo.id
    });
    expect(buscarEmpresitimoPorID.data_devolucao).toBe('2024-01-26');
  });

  test('Deve retornar os emprestimos pendentes', async () => {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivrosRepository.save(livroDTO);

    await typeormEmprestimoRepository.save([
      {
        usuario_id: usuario.id,
        livro_id: livro.id,
        data_saida: '2024-01-26',
        data_retorno: '2024-01-28',
        data_devolucao: '2024-01-28'
      },
      {
        usuario_id: usuario.id,
        livro_id: livro.id,
        data_saida: '2024-01-26',
        data_retorno: '2024-01-29'
      }
    ]);

    const emprestimosPendentes = await sut.buscarEmprestimosPententesComUser();

    expect(emprestimosPendentes).toHaveLength(1);
    expect(emprestimosPendentes[0].id).toBeDefined();
    expect(emprestimosPendentes[0].data_saida).toBe('2024-01-26');
    expect(emprestimosPendentes[0].data_retorno).toBe('2024-01-29');
    expect(emprestimosPendentes[0].data_devolucao).toBeUndefined();
    expect(emprestimosPendentes[0].usuario.nome_completo).toBe('nome_valido');
    expect(emprestimosPendentes[0].livro.nome).toBe('nome_valido');
  });

  test('Deve retornar true se existir um emprestimo pendente para o usuario e o livro', async () => {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivrosRepository.save(livroDTO);

    await typeormEmprestimoRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2024-01-26',
      data_retorno: '2024-01-26'
    });

    const existEmprestimoPendente = await sut.existeLivroISBNEmprestadoPendenteUsuario({
      livro_id: livro.id,
      usuario_id: usuario.id
    });
    expect(existEmprestimoPendente).toBe(true);
  });
  test('Deve retornar false se nao existir um emprestimo pendente para o usuario e o livro', async () => {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivrosRepository.save(livroDTO);

    const existEmprestimoPendente = await sut.existeLivroISBNEmprestadoPendenteUsuario({
      livro_id: livro.id,
      usuario_id: usuario.id
    });
    expect(existEmprestimoPendente).toBe(false);
  });

  test('Deve retornar o emprestimo buscado por ID com o usuario e o livro', async () => {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivrosRepository.save(livroDTO);

    const emprestimo = await typeormEmprestimoRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2024-01-26',
      data_retorno: '2024-01-26'
    });
    const buscarEmprestimoComLivroComUser = await sut.buscarEmprestimoComLivroComUserPorID(
      emprestimo.id
    );

    expect(buscarEmprestimoComLivroComUser).toEqual({
      id: emprestimo.id,
      data_saida: '2024-01-26',
      data_retorno: '2024-01-26',
      usuario: {
        nome_completo: 'nome_valido',
        CPF: 'CPF_valido',
        email: 'email_valido'
      },
      livro: {
        nome: 'nome_valido'
      }
    });
  });
});
