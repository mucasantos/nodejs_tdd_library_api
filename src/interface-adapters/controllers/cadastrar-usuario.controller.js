module.exports = async function cadastrarUsuarioController(cadastrarUsuarioUseCase, httpResquest) {
  const { nome_completo, CPF, endereco, telfeon, email } = httpResquest.body;
  const output = await cadastrarUsuarioUseCase({
    nome_completo,
    CPF,
    endereco,
    telfeon,
    email
  });

  return output.fold(
    (error) => httpResquest(400, error.message),
    () => httpResquest(201, null)
  );
};
