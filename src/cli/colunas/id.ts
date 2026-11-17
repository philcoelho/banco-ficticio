import type { Fatura } from "../../faturas/tipos.ts";

export const colunaId = (fatura: Fatura): string => fatura.id;
