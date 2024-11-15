const { AppError } = require('../../shared');
const emprestimoEntity = require('./emprestimo.entity');

describe('Emprestimos Entity', function () {
  test('CalcularMulta - sem atraso', () => {
    const resultado = emprestimoEntity.calcularMulta({
      data_devolucao: '2024-02-16',
      data_retorno: '2024-02-16'
    });

    expect(resultado).toBe('Multa por atraso: R$ 0');
  });

  test('CalcularMulta - com atraso', () => {
    const resultado = emprestimoEntity.calcularMulta({
      data_devolucao: '2024-02-17',
      data_retorno: '2024-02-16'
    });

    expect(resultado).toBe('Multa por atraso: R$ 10,00');
  });
  test('Calcular multa - retornar um appError se as dependencias obrigatorias', () => {
    expect(() => emprestimoEntity.calcularMulta({})).toThrow(
      AppError.parametrosObrigratoriosAusentes
    );
  });
});
