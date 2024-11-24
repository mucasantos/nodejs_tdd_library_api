const nodemailer = require('nodemailer');
require('dotenv').config();
module.exports = function nodemailerService() {
  const enviarEmail = async function ({
    data_saida,
    data_retorno,
    nome_usuario,
    CPF,
    email,
    nome_livro
  }) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const data_saida_BR = data_saida.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const data_retorno_BR = data_retorno.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    const sn = await transporter.sendMail({
      from: '"Biblioteca" <contato@bicobiz.com.br>',
      to: email,
      subject: 'Novo livro emprestado',
      text: `Olá ${nome_usuario}(${CPF}), você pegou o livro '${nome_livro}' emprestado no dia ${data_saida_BR} e deverá retornar no dia ${data_retorno_BR}`
    });

    console.log(sn);
  };
  return { enviarEmail };
};
