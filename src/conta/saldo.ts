import type { Centavos } from "../dinheiro.ts";

const DIAS_NO_MES = 30;

/**
 * Saldo da conta depois da taxa de manutenção mensal.
 * O saldo pode ficar negativo (conta devedora); a taxa nunca é negativa.
 * Contas abertas no meio do mês pagam a taxa proporcional aos dias ativos.
 */
export function calcularSaldo(
  total: Centavos,
  taxa: Centavos,
  diasAtivos: number = DIAS_NO_MES,
): Centavos {
  if (!Number.isInteger(total) || !Number.isInteger(taxa)) {
    throw new Error("Valores devem ser inteiros em centavos");
  }
  if (taxa < 0) {
    throw new Error(`Taxa não pode ser negativa: ${taxa}`);
  }
  const taxaProporcional = Math.round(
    (taxa * Math.min(diasAtivos, DIAS_NO_MES)) / DIAS_NO_MES,
  );
  return total - taxaProporcional;
}
