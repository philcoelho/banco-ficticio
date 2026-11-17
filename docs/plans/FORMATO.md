# Formato dos planos

Cada plano fica em `docs/plans/<nome-curto>.md` e é a memória operacional da execução: decisões, estado e evidências ficam aqui, não na conversa.

Um plano só é executado depois de revisado e aprovado por uma pessoa.

## Seções obrigatórias

```markdown
# Plano: <título>

Status: rascunho | em revisão | aprovado | em execução | concluído
Issue: <referência>

## Objetivo
- Situação atual: <comportamento atual e evidência>
- Situação esperada: <comportamento esperado>

## Limites
- Escopo: <o que entra>
- Fora de escopo: <o que não pode ser tocado>
- Invariantes: <o que não pode mudar ou quebrar>
- Dependências: <arquivos, contratos e módulos envolvidos>
- Riscos: <o que pode dar errado e como será percebido>

## Decisões e perguntas
- <pergunta> → <resposta e quem decidiu>

## Tarefas

### T1 · <título curto>
- Arquivos: <arquivos que devem mudar>
- Critérios de aceite:
  - [ ] <critério verificável>
  - [ ] <critério verificável>
- Checks: <comandos e testes que comprovam os critérios>

### T2 · ...

## Registro da execução
- Estado: <tarefa concluída mais recente> · próxima: <próxima tarefa>
- Decisões e desvios: <o que mudou em relação ao plano e por quê>
- Evidências: <saída dos checks, relatórios em docs/reports/>
```

## Regras

- Tarefas pequenas: cada uma cabe em um diff revisável e termina com `npm run check` verde.
- Critérios de aceite são verificáveis por teste ou por um comando, não por opinião.
- Lacunas de requisito viram perguntas; o plano não as preenche com suposições.
