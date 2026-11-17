import { parseDataBR } from "../datas.ts";
import { parseValorBR } from "../dinheiro.ts";
import type { Fatura, StatusFatura } from "./tipos.ts";

export interface ErroDeLinha {
  linha: number;
  motivo: string;
}

export interface ResultadoImportacao {
  faturas: Fatura[];
  erros: ErroDeLinha[];
}

const CABECALHO = "id;documento;cliente;valor;vencimento;status";
const STATUS_VALIDOS: readonly StatusFatura[] = ["aberta", "paga", "cancelada"];

/**
 * Importa faturas de um arquivo CSV exportado pelo ERP (separador ";").
 * Linhas inválidas não interrompem a importação: são devolvidas em `erros`.
 */
export function importarFaturasCsv(conteudo: Uint8Array): ResultadoImportacao {
  const texto = new TextDecoder("utf-8").decode(conteudo);
  // O TextDecoder já descarta o BOM inicial, se houver.
  const linhas = texto.split(/\r?\n/);

  if (linhas[0]?.trim().toLowerCase() !== CABECALHO) {
    throw new Error(`Cabeçalho inesperado. Esperado: ${CABECALHO}`);
  }

  const faturas: Fatura[] = [];
  const erros: ErroDeLinha[] = [];

  linhas.slice(1).forEach((bruta, indice) => {
    const numeroLinha = indice + 2;
    if (bruta.trim() === "") {
      return;
    }
    try {
      faturas.push(converterLinha(bruta));
    } catch (erro) {
      erros.push({ linha: numeroLinha, motivo: (erro as Error).message });
    }
  });

  return { faturas, erros };
}

function converterLinha(bruta: string): Fatura {
  const campos = bruta.split(";").map((campo) => campo.trim());
  if (campos.length !== 6) {
    throw new Error(`Esperados 6 campos, encontrados ${campos.length}`);
  }
  const [id, documento, cliente, valor, vencimento, status] = campos as [
    string,
    string,
    string,
    string,
    string,
    string,
  ];

  const documentoNumerico = documento.replace(/\D/g, "");
  if (documentoNumerico.length !== 11 && documentoNumerico.length !== 14) {
    throw new Error(`Documento inválido: "${documento}"`);
  }
  if (!STATUS_VALIDOS.includes(status as StatusFatura)) {
    throw new Error(`Status inválido: "${status}"`);
  }
  const valorCentavos = parseValorBR(valor);
  if (valorCentavos <= 0) {
    throw new Error(`Valor deve ser positivo: "${valor}"`);
  }

  return {
    id,
    documento: documentoNumerico,
    cliente,
    valor: valorCentavos,
    vencimento: parseDataBR(vencimento),
    status: status as StatusFatura,
  };
}
