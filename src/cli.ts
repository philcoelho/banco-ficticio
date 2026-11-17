import { readFileSync } from "node:fs";
import { argv, exit } from "node:process";
import { formatarBRL } from "./dinheiro.ts";
import { importarFaturasCsv } from "./faturas/importador.ts";
import { resumirCarteira } from "./faturas/resumo.ts";

// Uso: npm run importar -- <arquivo.csv> [data-de-referencia AAAA-MM-DD]
const [arquivo, dataReferencia = "2026-11-17"] = argv.slice(2);
if (!arquivo) {
  console.error("Uso: npm run importar -- <arquivo.csv> [AAAA-MM-DD]");
  exit(1);
}

const { faturas, erros } = importarFaturasCsv(readFileSync(arquivo));
if (faturas.length === 0) {
  console.log("Nenhuma fatura valida encontrada no arquivo.");
}

console.table(
  faturas.map((fatura) => ({
    id: fatura.id,
    cliente: fatura.cliente,
    valor: formatarBRL(fatura.valor),
    vencimento: fatura.vencimento,
    status: fatura.status,
  })),
);

for (const erro of erros) {
  console.error(`linha ${erro.linha}: ${erro.motivo}`);
}

const resumo = resumirCarteira(faturas, dataReferencia);
console.log(
  `Em aberto: ${resumo.quantidade.aberta} (${formatarBRL(resumo.total.aberta)}) · ` +
    `vencidas em ${dataReferencia}: ${resumo.vencidas.quantidade} ` +
    `(${formatarBRL(resumo.vencidas.total)})`,
);
