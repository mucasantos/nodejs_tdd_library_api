const { AppError } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');
const { z } = require('zod');

const zodValidator = z.object({
  nome: z.string({
    required_error: 'Nome é obrigatporio'
  }),
  quantidade: z.number({
    required_error: 'Quantidade é obrigatoria'
  }),
  autor: z.string({
    required_error: 'Autor é obrigatporio'
  }),
  genero: z.string({
    required_error: 'GEnero é obrigatporio'
  }),
  ISBN: z.string({
    required_error: 'ISBN é obrigatporio'
  })
});
module.exports = async function cadastrarLivroController({ cadastrarLivroUseCase, httpRequest }) {
  const checkDenpendes = !cadastrarLivroUseCase || !httpRequest || !httpRequest.body;

  if (checkDenpendes) throw new AppError(AppError.dependenciasAusentes);

  const { nome, quantidade, autor, genero, ISBN } = zodValidator.parse(httpRequest.body);

  const output = await cadastrarLivroUseCase({ nome, quantidade, autor, genero, ISBN });

  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null)
  );
};
