const devolverLivroUsecase = require('./devolver-livro.usecase');

describe('Devolver Livro UseCase', () => {
  const emprestimoRepository = {
    devolver: jest.fn()
  };
  test('Deve ser possivel devolver um livro sem multa', async () => {
    emprestimoRepository.devolver.mockResolvedValue({
      data_retorno: new Date('2024-02-06')
    });
    const devolverLivroDTO = {
      emprestimo_id: 'qualquer_id',
      data_devolucao: new Date('2024-02-06')
    };

    const sut = devolverLivroUsecase({ emprestimoRepository });
    const output = await sut(devolverLivroDTO);

    expect(output.right).toBe('Multa por atraso: R$ 0');
    expect(emprestimoRepository.devolver).toHaveBeenCalledWith(devolverLivroDTO);
    expect(emprestimoRepository.devolver).toHaveBeenCalledTimes(1);
  });

  test('Deve devolver um livro com multa', async () => {
    emprestimoRepository.devolver.mockResolvedValue({
      data_retorno: new Date('2024-02-07')
    });
    const devolverLivroDTO = {
      emprestimo_id: 'qualquer_id',
      data_devolucao: new Date('2024-02-06')
    };

    const sut = devolverLivroUsecase({ emprestimoRepository });
    const output = await sut(devolverLivroDTO);

    expect(output.right).toBe('Multa por atraso: R$ 10,00');
    expect(emprestimoRepository.devolver).toHaveBeenCalledWith(devolverLivroDTO);
    expect(emprestimoRepository.devolver).toHaveBeenCalledTimes(1);
  });
});
