import { describe, expect, it } from "vitest";
import {
  aplicarPercentual,
  formatarBRL,
  parseValorBR,
} from "../src/dinheiro.ts";

describe("parseValorBR", () => {
  it("converte valores com milhar e centavos", () => {
    expect(parseValorBR("1.234,56")).toBe(123456);
    expect(parseValorBR("1.234.567,89")).toBe(123456789);
  });

  it("aceita valores sem separador de milhar e com uma casa decimal", () => {
    expect(parseValorBR("89,9")).toBe(8990);
    expect(parseValorBR("1000")).toBe(100000);
    expect(parseValorBR("1.000")).toBe(100000);
  });

  it("aceita valores negativos", () => {
    expect(parseValorBR("-10,00")).toBe(-1000);
  });

  it("rejeita formatos inválidos", () => {
    expect(() => parseValorBR("abc")).toThrow("Valor inválido");
    expect(() => parseValorBR("1,234.56")).toThrow("Valor inválido");
    expect(() => parseValorBR("12,345")).toThrow("Valor inválido");
  });
});

describe("formatarBRL", () => {
  it("formata centavos como moeda brasileira", () => {
    expect(formatarBRL(123456)).toBe("R$ 1.234,56");
    expect(formatarBRL(5)).toBe("R$ 0,05");
    expect(formatarBRL(-1000)).toBe("-R$ 10,00");
  });

  it("rejeita valores fracionados", () => {
    expect(() => formatarBRL(10.5)).toThrow("inteiro");
  });
});

describe("aplicarPercentual", () => {
  it("arredonda para o centavo mais próximo", () => {
    expect(aplicarPercentual(10_000, 2)).toBe(200);
    expect(aplicarPercentual(38_990, 2)).toBe(780); // 779,8 centavos
    expect(aplicarPercentual(25, 2)).toBe(1); // 0,5 centavo arredonda para cima
  });
});
