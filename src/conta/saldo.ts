import type { Centavos } from "../dinheiro.ts";

/**
 * Saldo da conta depois da taxa de manutenção mensal.
 * O saldo pode ficar negativo (conta devedora); a taxa nunca é negativa.
 */
export function calcularSaldo(total: Centavos, taxa: Centavos): Centavos {
  if (!Number.isInteger(total) || !Number.isInteger(taxa)) {
    throw new Error("Valores devem ser inteiros em centavos");
  }
  if (taxa < 0) {
    throw new Error(`Taxa não pode ser negativa: ${taxa}`);
  }
  return total - taxa;
}
