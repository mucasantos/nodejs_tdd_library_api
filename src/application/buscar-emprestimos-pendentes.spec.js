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
        }
      },
      {
        usuario: {
          nome: 'qualquer_nome_valido',
          CPF: 'qualquer_CPF_valiod'
        },
        livro: {
          nome: 'qualquer_nome_livro_valido'
        }
      }
    ]);

    const sut = buscarEmprestimosPendentesUsecase({ emprestimosRepository });
    const output = await sut();

    expect(output.right).toHaveLength(2);
    expect(output.right[0].usuario.nome).toBe('qualquer_nome');
  });
});
