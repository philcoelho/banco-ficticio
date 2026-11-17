import { diasCorridos, type DataISO } from "../datas.ts";
import { formatarBRL, type Centavos } from "../dinheiro.ts";

export interface Lancamento {
  data: DataISO;
  descricao: string;
  /** Crédito positivo, débito negativo. */
  valor: Centavos;
}

export interface LinhaExtrato {
  data: string;
  descricao: string;
  valor: string;
}

/** Janela padrão do extrato exibido ao cliente. */
export const JANELA_PADRAO_DIAS = 30;

/**
 * Monta as linhas do extrato exibido ao cliente: só os lançamentos dentro
 * da janela (contada a partir da data de referência), do mais recente para
 * o mais antigo.
 */
export function montarExtrato(
  lancamentos: readonly Lancamento[],
  dataReferencia: DataISO,
  janelaDias: number = JANELA_PADRAO_DIAS,
): LinhaExtrato[] {
  return lancamentos
    .filter((lancamento) => {
      const idade = diasCorridos(lancamento.data, dataReferencia);
      return idade >= 0 && idade < janelaDias;
    })
    .sort((a, b) => b.data.localeCompare(a.data))
    .map((lancamento) => ({
      data: `${lancamento.data.slice(8, 10)}/${lancamento.data.slice(5, 7)}`,
      descricao: lancamento.descricao,
      valor: formatarBRL(lancamento.valor),
    }));
}
