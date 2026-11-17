import type { Fatura } from "../../faturas/tipos.ts";

export const colunaStatus = (fatura: Fatura): string => fatura.status;
