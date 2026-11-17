# ISSUE-155 · Dar baixa nas faturas a partir do arquivo de retorno do banco

**Tipo:** funcionalidade · **Prioridade:** alta · **Solicitante:** equipe financeira

## Contexto

Todo dia útil o banco envia um arquivo de retorno com os pagamentos recebidos. Hoje alguém da equipe financeira confere linha a linha e marca as faturas como pagas manualmente. Erros nessa conferência geram cobrança indevida de clientes que já pagaram.

Exemplo de arquivo: `fixtures/retorno-banco-2026-11-16.csv` (separador `;`).

## Pedido

1. Ler o arquivo de retorno e dar baixa nas faturas correspondentes.
2. Gerar um relatório da conciliação: o que foi baixado e o que precisa de análise humana.
3. Avisar o ERP sobre as faturas baixadas. O ERP expõe `POST /faturas/{id}/baixa` em `https://erp.empresa.example/api` e autentica com um token de serviço; o time de plataforma disponibiliza o token como variável de ambiente.

## Observações da equipe financeira

- Já aconteceu de o banco mandar a mesma linha duas vezes.
- Às vezes o cliente paga um valor diferente do da fatura.
- Faturas canceladas não podem voltar a ficar pagas sem análise.
