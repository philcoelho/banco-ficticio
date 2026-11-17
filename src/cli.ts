import { argv, exit } from "node:process";
import { executar } from "./cli/executar.ts";

// Uso: npm run importar -- <arquivo.csv> [data-de-referencia AAAA-MM-DD]
const codigo = executar(argv.slice(2));
if (codigo !== 0) {
  exit(codigo);
}
