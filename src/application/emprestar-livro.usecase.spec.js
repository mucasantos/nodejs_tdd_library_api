const { AppError } = require('../shared');
const Either = require('../shared/Either');
const emprestarLivrosUseCase = require('./emprestar-livros.usecase');

describe('Emprestar livro UseCase', function () {
  const emprestimoRepository = {
    emprestar: jest.fn(),
    existeLivroISBNEmprestadoPendenteUsuario: jest.fn(),
    buscarEmprestimoComLivroComUserPorID: jest.fn()
  };

  const emailService = {
    enviarEmail: jest.fn()
  };
  test('Deve poder emprestar um livro', async function () {
    emprestimoRepository.emprestar.mockResolvedValue('qualquer_id');
    emprestimoRepository.buscarEmprestimoComLivroComUserPorID.mockResolvedValue({
      usuario: {
        nome: 'qualquer_nome_usuario',
        CPF: 'qualquer_CPF',
        email: 'qualquer_email'
      },
      livro: {
        nome: 'qualquer_nome_livro'
      }
    });
    const emprestarLivroDTO = {
      usuario_id: 'qualquer_livro_id',
      livro_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-16')
    };

    const sut = emprestarLivrosUseCase({ emprestimoRepository, emailService });
    const output = await sut(emprestarLivroDTO);

    expect(output.right).toBeNull();
    expect(emprestimoRepository.emprestar).toHaveBeenCalledWith(emprestarLivroDTO);
    expect(emprestimoRepository.emprestar).toHaveBeenCalledTimes(1);

    expect(emailService.enviarEmail).toHaveBeenCalledWith({
      data_saida: emprestarLivroDTO.data_saida,
      data_retorno: emprestarLivroDTO.data_retorno,
      nome_usuario: 'qualquer_nome_usuario',
      CPF: 'qualquer_CPF',
      email: 'qualquer_email',
      nome_livro: 'qualquer_nome_livro'
    });
  });

  test('DEve retornar Either.left se a data de retorno for menor que a data de saida', async function () {
    const emprestarLivroDTO = {
      usuario_id: 'qualquer_livro_id',
      livro_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-15')
    };

    const sut = emprestarLivrosUseCase({ emprestimoRepository, emailService });
    const output = await sut(emprestarLivroDTO);

    expect(output.left).toBe(Either.dataRetornoMenorQueDataSaida);
  });

  test('Não deve permitir o emprestimo de livro com o mesmo ISBN para o mesmo usuario antes que o livro anterior seja devolvido', async function () {
    emprestimoRepository.existeLivroISBNEmprestadoPendenteUsuario.mockResolvedValue(true);
    const emprestarLivroDTO = {
      usuario_id: 'qualquer_livro_id',
      livro_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-16')
    };

    const sut = emprestarLivrosUseCase({ emprestimoRepository, emailService });
    const output = await sut(emprestarLivroDTO);

    expect(output.left).toBe(Either.existLivroISBNEmprestadoPendenteUsuario);
    expect(emprestimoRepository.existeLivroISBNEmprestadoPendenteUsuario).toHaveBeenCalledWith({
      livro_id: emprestarLivroDTO.livro_id,
      usuario_id: emprestarLivroDTO.usuario_id
    });
    expect(emprestimoRepository.existeLivroISBNEmprestadoPendenteUsuario).toHaveBeenCalledTimes(1);
  });

  test('DEve retornar um throw AppError se o emprestimoRepository nao for fornecido', () => {
    expect(() => emprestarLivrosUseCase({})).toThrow(new AppError(AppError.dependenciasAusentes));
  });

  test('Deve retornar um AppError se algum campo obrigatorio nao for fornecido', async () => {
    const sut = emprestarLivrosUseCase({ emprestimoRepository, emailService });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigratoriosAusentes)
    );
  });
});
