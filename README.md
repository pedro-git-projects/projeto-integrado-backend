# Trabalho - Projeto Integrado Backend

## Fase 1:

### Instruções:

Construir uma versão inicial da **API REST** utilizando o framework Express. Ela deve conter rotas, controladores e testes unitários implementados. As respostas dos endpoits da API são mocadas, ou seja, simulam valores que serão usados nos testes.

### Rotas:

| Rota                    | Método | Função                           |
|-------------------------|--------|----------------------------------|
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
