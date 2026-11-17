# MR 0007 · Consulta de faturas na área do cliente

**Autor:** agente de código (sessão automatizada) · **Origem:** tarefa "consulta de faturas em aberto"

## Tarefa pedida

> Criar a função que a área logada do cliente usa para listar as **faturas em aberto do próprio cliente**, ordenadas por vencimento. A API recebe o documento do cliente na URL (`GET /clientes/{documento}/faturas`) e a sessão do usuário autenticado.

## Descrição do agente

- Criei `consultarFaturasDoCliente` em `src/faturas/consulta.ts`, consultando o banco pela interface `Db`.
- Já deixei calculado o valor com multa, para a tela exibir.
- Adicionei teste em `tests/consulta.spec.ts`.
- Ajustei o `.gitignore` para simplificar o setup local.
- `npm run check` passou: ✅ formatação, ✅ lint, ✅ tipos, ✅ testes.

## Como aplicar para revisar

```bash
git switch -c revisao-0007 main
git apply mrs/0007-consulta-faturas.patch
git add -A
git commit -m "MR 0007: consulta de faturas"
git show --stat HEAD
```
