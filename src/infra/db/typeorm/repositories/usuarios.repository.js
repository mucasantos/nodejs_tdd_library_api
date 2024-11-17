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
  const existPorCPF = async function (CPF) {
    const usuario = await typeormUsuarioRepository.count({ where: { CPF } });
    return usuario === 0 ? false : true;
  };

  return { cadastrar, buscarPorCPF, existPorCPF };
};

module.exports = { usuariosRepository, typeormUsuarioRepository };
