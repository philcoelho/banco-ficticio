import { describe, expect, it } from "vitest";
import { resumirCarteira } from "../src/faturas/resumo.ts";
import type { Fatura } from "../src/faturas/tipos.ts";

const base: Fatura = {
  id: "F-1",
  documento: "12345678909",
  cliente: "Cliente Teste",
  valor: 10_000,
  vencimento: "2026-11-10",
  status: "aberta",
};

describe("resumirCarteira", () => {
  it("agrupa quantidade e total por status", () => {
    const resumo = resumirCarteira(
      [
        base,
        { ...base, id: "F-2", valor: 5_000, status: "paga" },
        { ...base, id: "F-3", valor: 2_500, status: "cancelada" },
      ],
      "2026-11-01",
    );

    expect(resumo.quantidade).toEqual({ aberta: 1, paga: 1, cancelada: 1 });
    expect(resumo.total).toEqual({
      aberta: 10_000,
      paga: 5_000,
      cancelada: 2_500,
    });
  });

  it("considera vencidas só as faturas abertas com vencimento anterior à referência", () => {
    const resumo = resumirCarteira(
      [
        base,
        { ...base, id: "F-2", vencimento: "2026-11-17" },
        { ...base, id: "F-3", status: "paga" },
      ],
      "2026-11-17",
    );

    expect(resumo.vencidas).toEqual({ quantidade: 1, total: 10_000 });
  });
});
