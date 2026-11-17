import type { DataISO } from "../datas.ts";
import { formatarBRL } from "../dinheiro.ts";
import type { ResumoCarteira } from "../faturas/resumo.ts";

export function textoDoResumo(
  resumo: ResumoCarteira,
  dataReferencia: DataISO,
): string {
  return (
    `Em aberto: ${resumo.quantidade.aberta} (${formatarBRL(resumo.total.aberta)}) · ` +
    `vencidas em ${dataReferencia}: ${resumo.vencidas.quantidade} ` +
    `(${formatarBRL(resumo.vencidas.total)})`
  );
}
