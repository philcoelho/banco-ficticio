import type { ErroDeLinha } from "../faturas/importador.ts";

export function textoDosErros(erros: readonly ErroDeLinha[]): string[] {
  return erros.map((erro) => `linha ${erro.linha}: ${erro.motivo}`);
}
