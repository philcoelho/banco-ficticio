import type { Fatura } from "../faturas/tipos.ts";
import { colunaCliente } from "./colunas/cliente.ts";
import { colunaId } from "./colunas/id.ts";
import { colunaStatus } from "./colunas/status.ts";
import { colunaValor } from "./colunas/valor.ts";
import { colunaVencimento } from "./colunas/vencimento.ts";

export function linhasDaTabela(faturas: readonly Fatura[]) {
  return faturas.map((fatura) => ({
    id: colunaId(fatura),
    cliente: colunaCliente(fatura),
    valor: colunaValor(fatura),
    vencimento: colunaVencimento(fatura),
    status: colunaStatus(fatura),
  }));
}
