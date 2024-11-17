const { typeormServer } = require('../setup');
const typeormEmprestimoRepository = typeormServer.getRepository('Emprestimo');

const emprestimosRepository = function () {
  const emprestar = async function ({ livro_id, usuario_id, data_saida, data_retorno }) {
    await typeormEmprestimoRepository.save({
      livro_id,
      usuario_id,
      data_saida,
      data_retorno
    });
  };
  return { emprestar };
};

module.exports = { typeormEmprestimoRepository, emprestimosRepository };
