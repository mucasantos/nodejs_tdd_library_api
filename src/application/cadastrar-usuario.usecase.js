module.exports = function cadastrarUsuarioUseCase() {
    return function({nome_completo, CPF, telefone, endereco, email}) {
        usuariosRepositoy.cadastrar({
            nome_completo, CPF, telefone, endereco, email,
        })
    }
}

