import type { Fatura } from "../../faturas/tipos.ts";

export const colunaCliente = (fatura: Fatura): string => fatura.cliente;
