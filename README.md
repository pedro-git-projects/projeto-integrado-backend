# Trabalho - Projeto Integrado Backend

## Fase 1:

### Instruções:

Construir uma versão inicial da **API REST** utilizando o framework Express. Ela deve conter rotas, controladores e testes unitários implementados. As respostas dos endpoits da API são mocadas, ou seja, simulam valores que serão usados nos testes.

## Fase 2:

### Instruções:

Produzir uma versão final da API REST contendo os modelos e validadores implementados e integrados ao banco de dados, utilizando o framework Express e o MongoDB. Deve-se implementar também a segurança da API utilizando JWT.

### Regras de Negócio:

A aplicação consiste em uma RESTful API para criar gerenciadores de finanças pessoais.

Um gerenciador de finanças possui:

- Saldo, um número representado sem vírgulas para evitar erros de truncamento com ponto flutuante

- Uma lista de contas onde cada conta possui: 

	- título

	- custo
	
	- frequência

	- status

	- data de pagamento
	
Para utilizar a API o usuário deve se cadastrar utilizando seu email e uma senha e cada email só pode ser cadastrado uma vez.

Há dois níveis de privilégio admnistrativo para um usuário:

- root

- users

Membros do grupo root podem acessar toda a base de dados da API, enqunato membros de users ficam restritos àqueles gerenciadores de finanças por eles mesmos criados.

Além disso um membro do grupo users pode criar um único gerenciador de finanças.

Membros de ambos os grupos são capzes de:

- Criar um gerencidor de finanças

- Listar os gerencidores por eles criados

- Filtrar as contas por:

	- título

	- status

	- frequência

- Criar contas

- Pagar contas

- Deletar contas

- Alterar o saldo

- Logar na API

- Sair da API

- Trocar a senha

Além disso usuários não cadastrados são capazes de se cadastrarem.

As funcionalidades:

- Consultar uma conta por ID

- Editar um gerenciador 

São exclusivas para usuários do grupo root.

Há ainda rotas para adminsitração da API onde é possível:

- Listar usuários

- Deleter usuários

Por fim, para todas as rotas com /budget no caminho, usuários do grupo users não precisam forncer IDs que usuários do grupo root precisam, uma vez que users estão limitados ao seu próprio gerenciador, o qual é único.

### Rotas:

| Rota                              | Método | Função                                              |
|-----------------------------------|--------|-----------------------------------------------------|
| /api-docs                         | GET    | Documentacao                                        |
| /budget                           | GET    | Retorna todos os gerenciadores de financas          |
| /budget                           | POST   | Cria um novo gerenciador de financas                |
| /budget/:id                       | GET    | Retorna o budget manager de id respectivo           | 
| /budget/:id                       | PUT    | Altera um gerenciador de financas                   |
| /budget/:id?                      | DELETE | Deleta um gerenciador de financas                   |
| /budget/:budgetid?/pay/:billid    | PUT    | Paga uma conta em um gerenciador de financas        |
| /budget/:id?/:operation/:balance  | PUT    | Altera o saldo de acordo com a operacao estipulada  |
| /budget/:id?/status/:status       | GET    | Filtra contas por status                            |
| /budget/:id?/frequency/:frequency | GET    | Filtra contas por frequencia                        |
| /budget/:id?/title/:title         | GET    | Filtra contas por titulo                            |
| /budget/:budgetid?/:billid        | DELETE | Deleta uma conta em un gerenciador de financas      |
| /signup 						    | POST   | Cria uma nova conta de usuário ou administrador     |
| /signin 						    | POST   | Loga um usuário     								   |
| /signout 						    | POST   | Desloga um usuário     							   |
| /user 						    | GET    | Lista todos os usuários 							   |
| /user 						    | PATCH  | Troca a senha de um usuário 					       |
| /user/:id 					    | GET    | Lista um usuário por ID 							   |
| /user/:id 					    | PUT    | Atualiza um usuário por ID 					       |
| /user/:id 					    | DELETE | Deleta um usuário por ID 					       |

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
| **src/interfaces**     | Armazenam interfaces e enums que definem os contratos dos objetos da aplicação                                                     |         
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

5. JsonWebToken

6. Cookie parser
