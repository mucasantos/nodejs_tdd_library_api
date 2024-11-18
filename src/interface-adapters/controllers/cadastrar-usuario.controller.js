const { AppError } = require('../../shared');
const httpResponse = require('../../shared/helpers/http.response');

const { z } = require('zod');

const zodValidator = z.object({
  nome_completo: z.string({
    required_error: 'Nome completo é obrigatório!'
  }),
  CPF: z
    .string({
      required_error: ' CPF é obrigatório'
    })
    .refine((value) => /^([0-9]{3}\.?[0-9]{3}\.[0-9]{3}\-?[0-9]{2})$/.test(value)),
  endereco: z.string({
    required_error: 'Endereço obrigatório'
  }),
  endereco: z.string({
    required_error: 'Endereço obrigatório'
  }),
  telefone: z.string({
    required_error: 'telefone obrigatório'
  }),
  email: z
    .string({
      required_error: 'email obrigatório'
    })
    .email({
      message: 'Email deve ser válido'
    })
});

module.exports = async function cadastrarUsuarioController({
  cadastrarUsuarioUseCase,
  httpRequest
}) {
  if (!cadastrarUsuarioUseCase || !httpRequest || !httpResponse) {
    throw new AppError(AppError.dependenciasAusentes);
  }
  const { nome_completo, CPF, endereco, telefone, email } = zodValidator.parse(httpRequest.body);
  const output = await cadastrarUsuarioUseCase({
    nome_completo,
    CPF,
    endereco,
    telefone,
    email
  });

  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null)
  );
};
