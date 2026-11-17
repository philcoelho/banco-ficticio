import { readFileSync } from "node:fs";
import { importarFaturasCsv } from "../faturas/importador.ts";
import { resumirCarteira } from "../faturas/resumo.ts";
import { lerArgumentos } from "./argumentos.ts";
import { textoDosErros } from "./erros.ts";
import { SEM_FATURAS, USO } from "./mensagens.ts";
import { textoDoResumo } from "./resumo.ts";
import { linhasDaTabela } from "./tabela.ts";

/** Executa o CLI e devolve o código de saída. */
export function executar(args: readonly string[]): number {
  const argumentos = lerArgumentos(args);
  if (!argumentos) {
    console.error(USO);
    return 1;
  }

  const { faturas, erros } = importarFaturasCsv(
    readFileSync(argumentos.arquivo),
  );
  if (faturas.length === 0) {
    console.log(SEM_FATURAS);
  }

  console.table(linhasDaTabela(faturas));
  for (const linha of textoDosErros(erros)) {
    console.error(linha);
  }

  const resumo = resumirCarteira(faturas, argumentos.dataReferencia);
  console.log(textoDoResumo(resumo, argumentos.dataReferencia));
  return 0;
}
