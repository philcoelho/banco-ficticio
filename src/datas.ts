/**
 * Datas de negócio circulam como texto ISO "AAAA-MM-DD", sem horário e sem
 * fuso. Nunca use new Date() sem argumento dentro de regras de negócio:
 * receba a data de referência como parâmetro.
 */
export type DataISO = string;

const MS_POR_DIA = 24 * 60 * 60 * 1000;

function paraUTC(data: DataISO): number {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data);
  if (!partes) {
    throw new Error(`Data inválida: "${data}"`);
  }
  const [, ano, mes, dia] = partes.map(Number) as [
    number,
    number,
    number,
    number,
  ];
  const utc = Date.UTC(ano, mes - 1, dia);
  const conferencia = new Date(utc);
  if (
    conferencia.getUTCFullYear() !== ano ||
    conferencia.getUTCMonth() !== mes - 1 ||
    conferencia.getUTCDate() !== dia
  ) {
    throw new Error(`Data inexistente: "${data}"`);
  }
  return utc;
}

/** Converte "dd/mm/aaaa" para "aaaa-mm-dd", validando a data. */
export function parseDataBR(texto: string): DataISO {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto.trim());
  if (!partes) {
    throw new Error(`Data inválida: "${texto}"`);
  }
  const iso = `${partes[3]}-${partes[2]}-${partes[1]}`;
  paraUTC(iso);
  return iso;
}

/** Dias corridos de `de` até `ate` (negativo se `ate` for anterior). */
export function diasCorridos(de: DataISO, ate: DataISO): number {
  return Math.round((paraUTC(ate) - paraUTC(de)) / MS_POR_DIA);
}
