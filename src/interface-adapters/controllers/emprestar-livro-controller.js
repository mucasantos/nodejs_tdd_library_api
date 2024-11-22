const { z } = require('zod');
const httpResponse = require('../../shared/helpers/http.response');
const { AppError } = require('../../shared');

const zodValidator = z.object({
  livro_id: z.number({
    required_error: 'Livro é obrigatório'
  }),
  usuario_id: z.number({
    required_error: ' USer é obrigatório'
  }),
  data_saida: z.string({
    required_error: 'Data saida é obrigatório'
  }),

  data_retorno: z.string({
    required_error: 'Data retorno é obrigatório'
  })
});
module.exports = async function emprestarLivroController({ emprestarLivroUseCase, httpRequest }) {
  if (!emprestarLivroUseCase || !httpRequest || !httpRequest.body)
    throw new AppError(AppError.dependenciasAusentes);

  const { livro_id, usuario_id, data_saida, data_retorno } = zodValidator.parse(httpRequest.body);

  const output = await emprestarLivroUseCase({
    livro_id,
    usuario_id,
    data_saida: new Date(data_saida),
    data_retorno: new Date(data_retorno)
  });
  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null)
  );
};
