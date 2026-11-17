import type { DataISO } from "../datas.ts";

export const DATA_REFERENCIA_PADRAO: DataISO = "2026-11-17";

export interface Argumentos {
  arquivo: string;
  dataReferencia: DataISO;
}

export function lerArgumentos(args: readonly string[]): Argumentos | undefined {
  const [arquivo, dataReferencia = DATA_REFERENCIA_PADRAO] = args;
  return arquivo ? { arquivo, dataReferencia } : undefined;
}
