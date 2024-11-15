const { AppError } = require('../shared');
const buscarEmprestimosPendentesUsecase = require('./buscar-emprestimos-pendentes.usecase');

describe('', function () {
  const emprestimosRepository = {
    buscarLivrosPendentesComUsuario: jest.fn()
  };

  test('Deve ser possivel buscar os emprestimos pendentes', async () => {
    emprestimosRepository.buscarLivrosPendentesComUsuario.mockResolvedValue([
      {
        usuario: {
          nome: 'qualquer_nome',
          CPF: 'qualquer_CPF'
        },
        livro: {
          nome: 'qualquer_nome_livro'
        },
        data_saida: '2024-10-01',
        data_retorno: '2024-10-02'
      },
      {
        usuario: {
          nome: 'qualquer_nome_valido',
          CPF: 'qualquer_CPF_valiod'
        },
        livro: {
          nome: 'qualquer_nome_livro_valido'
        },
        data_saida: '2024-10-01',
        data_retorno: '2024-10-15'
      }
    ]);

    const sut = buscarEmprestimosPendentesUsecase({ emprestimosRepository });
    const output = await sut();

    expect(output.right).toHaveLength(2);
    expect(output.right[0].usuario.nome).toBe('qualquer_nome');
  });

  test('Deve retornar um AppError caso o emprestimoRepository nao seja passado', () => {
    expect(() => buscarEmprestimosPendentesUsecase({})).toThrow(
      new AppError(AppError.dependenciasAusentes)
    );
  });
});
