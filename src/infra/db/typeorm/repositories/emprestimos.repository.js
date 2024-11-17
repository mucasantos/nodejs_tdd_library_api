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
  const devolver = async function ({ emprestimo_id, data_devolucao }) {
    await typeormEmprestimoRepository.update(emprestimo_id, {
      data_devolucao
    });

    const { data_retorno } = await typeormEmprestimoRepository.findOneBy({ id: emprestimo_id });

    return { data_retorno };
  };
  return { emprestar, devolver };
};

module.exports = { typeormEmprestimoRepository, emprestimosRepository };
