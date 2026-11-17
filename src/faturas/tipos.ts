import type { Centavos } from "../dinheiro.ts";
import type { DataISO } from "../datas.ts";

/** Contrato público das faturas. Alterações exigem autorização (ver AGENTS.md). */
export type StatusFatura = "aberta" | "paga" | "cancelada";

export interface Fatura {
  id: string;
  /** CPF (11 dígitos) ou CNPJ (14 dígitos), somente números. */
  documento: string;
  cliente: string;
  valor: Centavos;
  vencimento: DataISO;
  status: StatusFatura;
}
