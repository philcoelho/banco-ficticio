import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { importarFaturasCsv } from "../src/faturas/importador.ts";

const utf8 = readFileSync(
  new URL("../fixtures/faturas-utf8.csv", import.meta.url),
);

describe("importarFaturasCsv", () => {
  it("importa as linhas válidas de um arquivo UTF-8", () => {
    const { faturas } = importarFaturasCsv(utf8);

    expect(faturas).toHaveLength(5);
    expect(faturas[0]).toEqual({
      id: "F-1001",
      documento: "12345678909",
      cliente: "Maria Conceição Araújo",
      valor: 125000,
      vencimento: "2026-11-05",
      status: "aberta",
    });
  });

  it("devolve as linhas inválidas sem interromper a importação", () => {
    const { erros } = importarFaturasCsv(utf8);

    expect(erros).toEqual([{ linha: 7, motivo: 'Valor inválido: "abc"' }]);
  });

  it("rejeita arquivos com cabeçalho inesperado", () => {
    const conteudo = new TextEncoder().encode("codigo,valor\nX,1\n");

    expect(() => importarFaturasCsv(conteudo)).toThrow("Cabeçalho inesperado");
  });
});
