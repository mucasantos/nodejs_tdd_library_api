const { typeormServer } = require('../setup');
const typeormUsuarioRepository = typeormServer.getRepository('Usuario');
const usuariosRepository = function () {
  const cadastrar = async function ({ nome_completo, CPF, telefone, endereco, email }) {
    await typeormUsuarioRepository.save({ nome_completo, CPF, telefone, endereco, email });
  };

  const buscarPorCPF = async function (CPF) {
    const usuario = typeormUsuarioRepository.findOne({
      where: {
        CPF
      }
    });
    return usuario;
  };

  return { cadastrar, buscarPorCPF };
};

module.exports = { usuariosRepository, typeormUsuarioRepository };
