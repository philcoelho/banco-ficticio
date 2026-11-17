# Padrão: valores monetários e datas

## Valores

- Todo valor monetário é um inteiro em centavos (`Centavos`, em `src/dinheiro.ts`). Nunca use ponto flutuante para guardar ou somar dinheiro.
- Converta texto com `parseValorBR` e exiba com `formatarBRL`.
- Percentuais são aplicados com `aplicarPercentual`, que arredonda para o centavo mais próximo (meio centavo arredonda para cima). Cada componente (multa, juros, desconto) é arredondado separadamente e depois somado.
- Valores de fatura são sempre positivos.

## Datas

- Datas de negócio são texto ISO `AAAA-MM-DD` (`DataISO`, em `src/datas.ts`), sem horário nem fuso.
- Regras de negócio recebem a data de referência como parâmetro. Não use `new Date()` sem argumento nem `Date.now()` dentro delas.
- Use `diasCorridos` para diferenças entre datas.
