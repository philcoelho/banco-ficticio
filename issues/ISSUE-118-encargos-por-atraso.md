# ISSUE-118 · Calcular encargos de faturas pagas com atraso

**Tipo:** funcionalidade · **Prioridade:** alta · **Solicitante:** equipe de cobrança

## Contexto

Hoje o sistema mostra apenas o valor original das faturas. Quando o cliente paga depois do vencimento, a equipe de cobrança calcula multa e juros numa planilha, e os valores divergem entre atendentes.

## Pedido

Quero que o sistema calcule o valor atualizado de uma fatura vencida, com multa e juros, para usar no atendimento e, depois, na segunda via do boleto.

A multa e os juros seguem o que está no contrato padrão com os clientes.

## Observações

- O resumo da carteira (`npm run importar`) deveria passar a mostrar quanto as faturas vencidas valem com os encargos.
- Temos dúvidas sobre como tratar vencimentos em fim de semana; a área jurídica ainda vai responder.
