import { describe, expect, it } from "vitest";
import { diasCorridos, parseDataBR } from "../src/datas.ts";

describe("parseDataBR", () => {
  it("converte dd/mm/aaaa para ISO", () => {
    expect(parseDataBR("05/11/2026")).toBe("2026-11-05");
  });

  it("rejeita datas inexistentes ou mal formatadas", () => {
    expect(() => parseDataBR("31/02/2026")).toThrow("inexistente");
    expect(() => parseDataBR("2026-11-05")).toThrow("inválida");
  });

  it("aceita 29 de fevereiro só em ano bissexto", () => {
    expect(parseDataBR("29/02/2028")).toBe("2028-02-29");
    expect(() => parseDataBR("29/02/2027")).toThrow("inexistente");
  });

  it("ignora espaços em volta da data", () => {
    expect(parseDataBR(" 05/11/2026 ")).toBe("2026-11-05");
  });
});

describe("diasCorridos", () => {
  it("conta dias corridos, inclusive entre meses e anos", () => {
    expect(diasCorridos("2026-11-05", "2026-11-05")).toBe(0);
    expect(diasCorridos("2026-11-05", "2026-11-17")).toBe(12);
    expect(diasCorridos("2026-12-31", "2027-01-01")).toBe(1);
    expect(diasCorridos("2028-02-28", "2028-03-01")).toBe(2); // ano bissexto
  });

  it("devolve negativo quando a data final é anterior", () => {
    expect(diasCorridos("2026-11-17", "2026-11-05")).toBe(-12);
  });
});
