const { emprestimosRepository, typeormEmprestimoRepository } = require('./emprestimos.repository');
const { typeormLivrosRepository } = require('./livros.repository');
const { typeormUsuarioRepository } = require('./usuarios.repository');

describe('Emprestimos Repository Typeorm', function () {
  let sut;
  beforeAll(function () {
    sut = emprestimosRepository();
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
});
