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
});
