import type { Fatura } from "../../faturas/tipos.ts";

export const colunaVencimento = (fatura: Fatura): string => fatura.vencimento;
