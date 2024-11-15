describe('Devolver Livro UseCase', () => {
  const emprestimoRepository = {
    devolver: jest.fn()
  };
  test('Deve ser possivel devolver um livro sem multa', async () => {
    const devolverLivroDTO = {
      emprestimo_id: 'qualquer_id',
      data_devoluca: new Date('2024-02-06')
    };

    const sut = devolverLivroUseCase({ emprestimoRepository });
    const output = await sut(devolverLivroDTO);

    expect(output.right).toBe('Multa por atraso: R$ 0');
    expect(emprestimoRepository.devolver).toHaveBeenCalledWith(devolverLivroDTO);
    expect(emprestimoRepository.devolver).toHaveBeenCalledTimes(1);
  });
});
