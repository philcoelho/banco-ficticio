import { formatarBRL } from "../../dinheiro.ts";
import type { Fatura } from "../../faturas/tipos.ts";

export const colunaValor = (fatura: Fatura): string =>
  formatarBRL(fatura.valor);
