# Padrão: testes

- Framework: Vitest. Os testes ficam em `tests/` com o sufixo `.spec.ts`.
- Testes não acessam rede nem segredos. Integrações HTTP recebem `fetch` injetável e usam um dublê nos testes.
- Datas de referência são fixas nos testes; nunca dependem do relógio.
- Cada critério de aceite de uma tarefa tem pelo menos um teste que falharia sem a mudança.
- Cubra os casos limítrofes de regras de negócio (zero, limite exato, valor negativo, data igual ao vencimento).
- É proibido, sem autorização explícita: apagar testes, marcar testes com `skip`/`todo`, trocar um valor esperado para acomodar um defeito, enfraquecer asserções (por exemplo, `toEqual` virar `toBeDefined`) e desativar regras de lint ou de tipos com comentários.
