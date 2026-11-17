/**
 * Valores monetários circulam no sistema como inteiros em centavos.
 * Regras completas em docs/standards/dinheiro.md.
 */
export type Centavos = number;

// "1.234,56", "1234,56", "89,9", "-10,00", "1.000"
const FORMATO_BR = /^-?(\d{1,3}(\.\d{3})+|\d+)(,\d{1,2})?$/;

/** Converte um valor no formato brasileiro ("1.234,56") para centavos. */
export function parseValorBR(texto: string): Centavos {
  const limpo = texto.trim();
  if (!FORMATO_BR.test(limpo)) {
    throw new Error(`Valor inválido: "${texto}"`);
  }
  const negativo = limpo.startsWith("-");
  const [inteiro = "0", decimal = ""] = limpo
    .replace("-", "")
    .replaceAll(".", "")
    .split(",");
  const centavos = Number(inteiro) * 100 + Number(decimal.padEnd(2, "0"));
  return negativo ? -centavos : centavos;
}

/** Formata centavos como moeda brasileira: 123456 -> "R$ 1.234,56". */
export function formatarBRL(valor: Centavos): string {
  if (!Number.isInteger(valor)) {
    throw new Error(`Valor em centavos deve ser inteiro: ${valor}`);
  }
  const abs = Math.abs(valor);
  const reais = Math.trunc(abs / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const centavos = (abs % 100).toString().padStart(2, "0");
  return `${valor < 0 ? "-" : ""}R$ ${reais},${centavos}`;
}

/**
 * Aplica um percentual a um valor em centavos e arredonda para o centavo
 * mais próximo (meio centavo arredonda para cima).
 * Ex.: aplicarPercentual(10_000, 2) -> 200
 */
export function aplicarPercentual(
  valor: Centavos,
  percentual: number,
): Centavos {
  return Math.round((valor * percentual) / 100);
}
