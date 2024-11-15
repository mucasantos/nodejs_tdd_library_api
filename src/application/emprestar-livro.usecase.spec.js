const Either = require('../shared/Either');
const { existLivroISBNEmprestadoPendenteUsuario } = require('../shared/Either');
const emprestarLivrosUsecase = require('./emprestar-livros.usecase');

describe('Emprestar livro UseCase', function () {
  const emprestimoRepository = {
    emprestar: jest.fn(),
    existLivroISBNEmprestadoPendenteUsuario: jest.fn()
  };
  test('Deve poder emprestar um livro', async function () {
    const emprestarLivroDTO = {
      usuario_id: 'qualquer_livro_id',
      livro_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-16')
    };

    const sut = emprestarLivrosUsecase({ emprestimoRepository });
    const output = await sut(emprestarLivroDTO);

    expect(output.right).toBeNull();
    expect(emprestimoRepository.emprestar).toHaveBeenCalledWith(emprestarLivroDTO);
    expect(emprestimoRepository.emprestar).toHaveBeenCalledTimes(1);
  });

  test('DEve retornar Either.left se a data de retorno for menor que a data de saida', async function () {
    const emprestarLivroDTO = {
      usuario_id: 'qualquer_livro_id',
      livro_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-15')
    };

    const sut = emprestarLivrosUsecase({ emprestimoRepository });
    const output = await sut(emprestarLivroDTO);

    expect(output.left).toBe(Either.dataRetornoMenorQueDataSaida);
  });

  test('Não deve permitir o emprestimo de livro com o mesmo ISBN para o mesmo usuario antes que o livro anterior seja devolvido', async function () {
    emprestimoRepository.existLivroISBNEmprestadoPendenteUsuario.mockResolvedValue(true);
    const emprestarLivroDTO = {
      usuario_id: 'qualquer_livro_id',
      livro_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-16')
    };

    const sut = emprestarLivrosUsecase({ emprestimoRepository });
    const output = await sut(emprestarLivroDTO);

    expect(output.left).toBe(Either.existLivroISBNEmprestadoPendenteUsuario);
    expect(emprestimoRepository.existLivroISBNEmprestadoPendenteUsuario).toHaveBeenCalledWith({
      livro_id: emprestarLivroDTO.livro_id,
      usuario_id: emprestarLivroDTO.usuario_id
    });
    expect(emprestimoRepository.existLivroISBNEmprestadoPendenteUsuario).toHaveBeenCalledTimes(1);
  });
});
