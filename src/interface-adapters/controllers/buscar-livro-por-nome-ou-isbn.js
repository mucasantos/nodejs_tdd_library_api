const { z } = require('zod');
const httpResponse = require('../../shared/helpers/http.response');
const { AppError } = require('../../shared');

const zodValidator = z.object({
  valor: z.string({
    required_error: 'Valor é obrigatorio'
  })
});

module.exports = async function buscarLivroPorNomeOuISBNController({
  buscarLivroPorNomeOuISBNUseCase,
  httpRequest
}) {
  const checkDependencias = !buscarLivroPorNomeOuISBNUseCase || !httpRequest;
  if (checkDependencias) {
    throw new AppError(AppError.dependenciasAusentes);
  }
  const { valor } = zodValidator.parse(httpRequest.query);

  const output = await buscarLivroPorNomeOuISBNUseCase({ valor });

  return output.fold(
    (error) => httpResponse(400, error.message),
    (livros) => httpResponse(200, livros)
  );
};
