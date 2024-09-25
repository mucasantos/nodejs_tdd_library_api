const AppError = require('./AppError');

describe('AppError', function () {
  test('AppError é uma instancia de Error', function () {
    const appError = new AppError('erro');
    expect(appError).toBeInstanceOf(Error);
  });

  test('AppError contem a mensagem correta', () => {
    const message = 'MEnsagem de error';
    const appError = new AppError(message);

    expect(appError.message).toBe(message);
  });
});
