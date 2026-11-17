import { describe, expect, it } from "vitest";
import { montarExtrato, type Lancamento } from "../src/conta/extrato.ts";
import { calcularSaldo } from "../src/conta/saldo.ts";

describe("calcularSaldo", () => {
  it("desconta a taxa de manutenção", () => {
    expect(calcularSaldo(10_000, 300)).toBe(9_700);
  });

  it("permite saldo negativo, mas não taxa negativa", () => {
    expect(calcularSaldo(100, 300)).toBe(-200);
    expect(() => calcularSaldo(10_000, -300)).toThrow(
      "Taxa não pode ser negativa",
    );
  });

  it("cobra a taxa proporcional aos dias ativos no mês", () => {
    expect(calcularSaldo(10_000, 300, 10)).toBe(9_900);
  });

  it("rejeita valores fracionados", () => {
    expect(() => calcularSaldo(100.5, 300)).toThrow("inteiros em centavos");
  });
});

describe("montarExtrato", () => {
  const lancamentos: Lancamento[] = [
    { data: "2026-10-01", descricao: "Salário", valor: 500_000 },
    { data: "2026-11-03", descricao: "Mercado", valor: -12_345 },
    { data: "2026-11-15", descricao: "Pix recebido", valor: 2_000 },
    { data: "2026-11-20", descricao: "Agendado", valor: -9_900 },
  ];

  it("mostra só a janela de 30 dias, do mais recente para o mais antigo", () => {
    expect(montarExtrato(lancamentos, "2026-11-17")).toEqual([
      { data: "15/11", descricao: "Pix recebido", valor: "R$ 20,00" },
      { data: "03/11", descricao: "Mercado", valor: "-R$ 123,45" },
    ]);
  });

  it("aceita outra janela", () => {
    expect(montarExtrato(lancamentos, "2026-11-17", 60)).toHaveLength(3);
  });
});
