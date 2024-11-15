## reunião

> Antes de codar, entender os sistema - o que o usuário precisa

> Projeto: Uma biblioteca que deseja controlar a entrada e saida de livros.Precisamos do cadastro de usuários que vai pegar o livro emprestado, cadastrar os livros e emprestar os livros para qualquer usuário cadastrado, também precisamos de empréstimos.

## Dados

- Usuario: [nome_completo, CPF, telefone, endereco, email]
- Livro: [nome, autor, quantidade, genero, ISBN]
- Emprestimo: [usuario_id, livro_id, data_retorno, data_devolucao, data_saida]
  (Este empréstimo vai depender a regra de negocio)

## UsesCases (Regras de negócio)

[x] Cadastrar um novo usuário: CPF e eemail devem ser únicos

[x] Buscar um cadastro de usuário por CPF: retornar um user ou vazio

[x] Cadastrar um novo livro:
[x] - ISBN deve ser único

[x] Buscar um livro por nome ou ISBN:
[x] Retornar os livros ou vazio

[x] Emprestar um livro ao user:
[x]_ A data de retorno nao poder ser menor do que a data de saida
[x]_ Um user nao poder estar com mais de um livro com o mesmo ISBN ao mesmo tempo
[x]_ Um user poder estar com mais de um livro com ISBN diferentes ao mesmo tempo
[x] _ Ao cadastrar um emprestimo, sera enviado um email automaticamente informando o nome do livro, nome do user, cpf e data de saida e data de retorno

[] Devolver o livro emprestado sem multa
[] Caso o usuário tenha atrasado, será gerada uma multa fixa de R$10,00

[] Mostrar todos os emprestimos pendentes \* Com o nome do livro, nome do user, CPF, data de saida e data de retorno, ordenados pela data de retorno mais antiga.

    OBS: O VSCODE "acha" que nao tem importacao.
    Para o vsCOde entender que é um projeto e tem importacao. por isso criamos os jsconfig

    https://code.visualstudio.com/docs/languages/jsconfig

## Estruturas

## UsuariosRepository

[] cadastrar: ({ nome_completo, CPF, telefone, endereco, email })=> Promise<void>
[] existePorCPF (CPF)=>Promise<boolean>
[] existePorEmail (email)=>Promise<boolean>

## livrosRepository

[] cadastrar: ({ nome, quantidade, autor, genero, ISBN })=> Promise<void>
[] existePorISBN (ISBN)=>Promise<boolean>
[] buscarPorNomeOuISBN (valor)=>Promise<array<Livro>>

## emprestimoRepository

[] emprestar({livro_id, usuario_id, data_saida, data_retorno}) => Promise<void>
[] buscarEmprestimoComLivroComUserPorID: id => Promise<Emprestimo> && {Livro: {noem}, Usuario: {nome, CPF, email}}
[] devolver: ({emprestimo_id, data_devolucao}) => Promise<{data_retorno}>
[] buscarLivrosPendentesComUsuario: () => Promise<Emprestimos: {data_saida, data_retorno && livro: {nome}, usuario: {nome, CPF}}>
