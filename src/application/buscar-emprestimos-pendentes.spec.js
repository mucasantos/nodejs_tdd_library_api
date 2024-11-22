const buscarPendentes = require('../../tests/fixtures/buscar-pendentes');
const { AppError } = require('../shared');
const buscarEmprestimosPendentesUsecase = require('./buscar-emprestimos-pendentes.usecase');

describe('', function () {
  const emprestimosRepository = {
    buscarLivrosPendentesComUsuario: jest.fn()
  };

  test('Deve ser possivel buscar os emprestimos pendentes', async () => {
    emprestimosRepository.buscarLivrosPendentesComUsuario.mockResolvedValue(buscarPendentes);

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
