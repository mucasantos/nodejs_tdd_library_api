module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
  static dependenciasAusentes = 'Alguma dependência não foi fornecida.';
  static parametrosObrigratoriosAusentes = 'Alguma parametro obrigatorio não foi fornecida.';
};
