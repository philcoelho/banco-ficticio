import type { Centavos } from "../dinheiro.ts";
import type { DataISO } from "../datas.ts";
import type { Fatura, StatusFatura } from "./tipos.ts";

export interface ResumoCarteira {
  quantidade: Record<StatusFatura, number>;
  total: Record<StatusFatura, Centavos>;
  /** Faturas abertas com vencimento anterior à data de referência. */
  vencidas: { quantidade: number; total: Centavos };
}

export function resumirCarteira(
  faturas: readonly Fatura[],
  dataReferencia: DataISO,
): ResumoCarteira {
  const resumo: ResumoCarteira = {
    quantidade: { aberta: 0, paga: 0, cancelada: 0 },
    total: { aberta: 0, paga: 0, cancelada: 0 },
    vencidas: { quantidade: 0, total: 0 },
  };

  for (const fatura of faturas) {
    resumo.quantidade[fatura.status] += 1;
    resumo.total[fatura.status] += fatura.valor;
    if (fatura.status === "aberta" && fatura.vencimento < dataReferencia) {
      resumo.vencidas.quantidade += 1;
      resumo.vencidas.total += fatura.valor;
    }
  }

  return resumo;
}
