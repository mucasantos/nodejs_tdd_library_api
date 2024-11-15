# nodejs_tdd_library_api

# Biblioteca API

## Descrição

Esta é uma API para gerenciar o sistema de empréstimo de livros de uma biblioteca. A API permite controlar o cadastro de usuários, o registro de livros, e o processo de empréstimo e devolução de livros. Foi desenvolvida em **Node.js** com **Express**, utilizando **Test-Driven Development (TDD)**, **Clean Architecture** e o conceito de **API Testável**.

## Funcionalidades

- **Cadastro de Usuários**: Registra os usuários que poderão pegar livros emprestados.
- **Cadastro de Livros**: Permite cadastrar novos livros disponíveis para empréstimo.
- **Empréstimos de Livros**: Realiza o empréstimo de livros cadastrados para usuários registrados.
- **Controle de Empréstimos**: Garante o controle de entrada e saída dos livros emprestados, incluindo data de empréstimo e devolução.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para desenvolvimento da aplicação.
- **Express**: Framework para construção da API.
- **Jest**: Biblioteca para testes unitários e de integração, usada para garantir a qualidade da aplicação.
- **TDD (Test-Driven Development)**: Metodologia de desenvolvimento orientada a testes.
- **Clean Architecture**: Arquitetura para manter o código organizado e fácil de manter.
- **API Testável**: Conceito que permite que cada endpoint seja facilmente testado e validado.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/mucasantos/nodejs_tdd_library_api
   ```

## Importante

Os testes de UseCase focam na entrada e saída
