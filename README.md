# Trabalho - Projeto Integrado Backend

## Fase 1:

### Instruções:

Construir uma versão inicial da **API REST** utilizando o framework Express. Ela deve conter rotas, controladores e testes unitários implementados. As respostas dos endpoits da API são mocadas, ou seja, simulam valores que serão usados nos testes.

### Rotas:

| Rota                    | Método | Função                           |
|-------------------------|--------|----------------------------------|
| /api-docs               | GET    | Documentação com Swagger 	      |
| /budget                 | GET    | Acessa o Gerenciador de Finanças |
| /budget/balance         | GET    | Acessa apenas o saldo            |
| /budget/bills           | GET    | Acessa todas as contas           |
| /budget/bill/:id        | GET    | Acessa uma conta por ID          |
| /budget/bills/paid      | GET    | Acessa as contas pagas           |
| /budget/bills/pending   | GET    | Acessa as contas pendentes       |
| /budget/bills/overdue   | GET    | Acessa as contas vencidas        |
| /budget/bill/delete/:id | DELETE | Deleta uma conta                 |
| /budget/bill/create     | POST   | Cria uma nova conta              |
| /budget/balance/add     | PUT    | Adiciona saldo                   |
| /budget/balance/remove  | PUT    | Remove saldo                     |
| /budget/bill/pay/:id    | PUT    | Paga uma conta por ID            |

### Instalando o projeto:

Para instalar as dependências basta:

- Executar o comando 

```
$ npm install
```

Ou:

- Executar o comando

```
$ make install
```

### Executando o projeto:

Para executar o projeto basta:

- Executar o comando:

```
$ npm run dev
```

Ou:

```
$ make run
```

### Rodando os testes

Para rodar os testes basta:

- Executar o comando 

```
$ npm run test
```

ou 

```
$ make test
```

### Estrutura 

| Pasta/Arquivo       | Funcao                                               |     
|---------------------|------------------------------------------------------|
| **src**             |  Armazena os arquivos relevates para a aplicacao     |         
| **src/Controllers** | Armazena os controladores                            |         
| **src/DTO**         | Armazena classes que armazenam dados entre processos |        
| **src/Exceptions**  | Aramazena a classe que define o tratamento de excessões                                            |        
| **src/internals**     | Armazena arquivos importantes para o funcionamento interno da aplicação                                                     |         
| **src/middleware** | Armazena as definições de middleware a serem invocadas em app.ts |         
| **src/models**| Armazena os dados mockados                                 |         
| **src/routes** | Armazena as rotas da aplicação |         
| **src/services** | Armazena classes que operam com dados de outras partes da aplicação |         
| **src/tests** | Armazena a classe de testes|         
| **src/utils** | Armazena arquivos de propósito geral que podem ser utilizados em outras aplicações |         
| src/app.ts | Define a classe de configuração da aplicação |         
| src/index.ts | Define o ponto de entrada da aplicação |         
| .gitignore | Lista as pastas e arquivos a serem ignorados pelo git |         
| Makefile | Define receitas para automatizar processos relativos ao desenvolvimento |         
| jest.config.js | Contém as configurações do framework de testes jest |         
| swagger.yaml | Contém as configurações do swagger |         
| tsconfig.json | Contém as configurações do compilador do Typescript |         
| tslint.json | Contém as configurações do linter para o Typescript |         


### Bibliotecas

Foram utilizadas: 

1. Express 

2. Jest

3. Supertest

4. Swagger
