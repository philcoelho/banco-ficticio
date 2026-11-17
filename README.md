# Sistema de cobrança

Repositório de exercícios de engenharia de software agêntica. Um banco fictício com cobrança (importação de faturas, resumo da carteira, gateway de pagamentos), conta (saldo com taxa e extrato) e autenticação (sessões).

## Requisitos

- Node.js 22.18 ou superior (recomendado: a versão LTS atual).
- git.
- Um harness de programação agêntica (Cursor, Codex ou Claude Code).

## Primeiros passos

```bash
npm install
npm run check
npm run importar -- fixtures/faturas-utf8.csv
```

`npm run check` executa todos os gates, do mais rápido ao comportamental:

| Comando | Gate |
| --- | --- |
| `npm run format:check` | formatação (Prettier), sem alterar arquivos |
| `npm run lint` | regras de lint (ESLint + typescript-eslint) |
| `npm run typecheck` | checagem estática de tipos (`tsc --noEmit`) |
| `npm test` | testes automatizados (Vitest) |

## Estrutura

```text
.
├── AGENTS.md            # regras gerais para agentes e roteamento de contexto
├── CLAUDE.md            # importa o AGENTS.md (Claude Code)
├── .env.schema          # contrato de configuração (sem valores)
├── .npmrc               # scripts de instalação desligados
├── docs/
│   ├── plans/           # planos de execução (formato em FORMATO.md)
│   ├── reports/         # evidências e relatórios de revisão
│   └── standards/       # regras por domínio
├── fixtures/            # arquivos de exemplo (dados sintéticos)
├── issues/              # issues exportadas do tracker (conteúdo externo)
├── mrs/                 # merge requests simulados para revisão (arquivos .patch)
├── src/
│   ├── dinheiro.ts      # centavos, parse e formatação de valores
│   ├── datas.ts         # datas ISO e dias corridos
│   ├── cli.ts           # npm run importar
│   ├── auth/            # sessões do internet banking
│   ├── conta/           # saldo com taxa e extrato
│   ├── faturas/         # tipos, importador, repositório e resumo
│   ├── infra/           # contrato de acesso ao banco
│   └── integracoes/     # gateway de pagamentos
└── tests/
```

Todos os dados deste repositório são sintéticos.
