const { typeormServer } = require('../setup');
const typeormUsuarioRepository = typeormServer.getRepository('Usuario');
const usuariosRepository = function () {
  const cadastrar = async function ({ nome_completo, CPF, telefone, endereco, email }) {
    await typeormUsuarioRepository.save({ nome_completo, CPF, telefone, endereco, email });
  };

  return { cadastrar };
};

module.exports = { usuariosRepository, typeormUsuarioRepository };
