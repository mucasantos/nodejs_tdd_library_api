## reunião

> Antes de codar, entender os sistema - o que o usuário precisa

>Projeto: Uma biblioteca que deseja controlar a entrada e saida de livros.Precisamos do cadastro de usuários que vai pegar o livro emprestado, cadastrar os livros e emprestar os livros para qualquer usuário cadastrado, também precisamos de empréstimos.

## Dados

- Usuario: [nome_completo, CPF, telefone, endereco, email]
- Livro: [nome, autor, quantidade, genero, ISBN]
- Emprestimo: [usuario_id, livro_id, data_retorno, data_devolucao, data_saida]
(Este empréstimo vai depender a regra de negocio)

## UsesCases (Regras de negócio)
[] Cadastrar um novo usuário: CPF e eemail devem ser únicos

[] Buscar um cadastro de usuário por CPF: retornar um user ou vazio

[] Cadastrar um novo livro: ISBN deve ser único

[] Buscar um livro por nome ou ISBN: Retornar os livros ou vazio

[] Emprestar um livro ao user:
    * A data de retorno nao poder ser menor do que a data de saida
    * Um user nao poder estar com mais de um livro com o mesmo ISBN ao mesmo tempo
    * Um user poder estar com mais de um livro com ISBN diferentes ao mesmo tempo
    * Ao cadastrar um emprestimo, sera enviado um email automaticamente informando o nome do livro, nome do user, cpf e data de saida

[] Devolver o livro emprestado
    * Caso o usuário tenha atrasado, será gerada uma multa fixa de R$10,00

[] Mostrar todos os emprestimos pendentes 
    * Com o nome do livro, nome do user, CPF, data de saida e data de retorno, ordenados pela data de retorno mais antiga.