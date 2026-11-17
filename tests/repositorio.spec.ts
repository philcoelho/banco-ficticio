import { describe, expect, it } from "vitest";
import { RepositorioFaturas } from "../src/faturas/repositorio.ts";
import type { Fatura } from "../src/faturas/tipos.ts";

const fatura: Fatura = {
  id: "F-1",
  documento: "12345678909",
  cliente: "Cliente Teste",
  valor: 10_000,
  vencimento: "2026-11-10",
  status: "aberta",
};

describe("RepositorioFaturas", () => {
  it("busca por id e por documento", () => {
    const repositorio = new RepositorioFaturas();
    repositorio.salvar(fatura);
    repositorio.salvar({ ...fatura, id: "F-2", documento: "98765432100" });

    expect(repositorio.buscarPorId("F-1")).toEqual(fatura);
    expect(
      repositorio.listarPorDocumento("98765432100").map((f) => f.id),
    ).toEqual(["F-2"]);
  });

  it("devolve cópias, sem expor o estado interno", () => {
    const repositorio = new RepositorioFaturas();
    repositorio.salvar(fatura);

    const lida = repositorio.buscarPorId("F-1");
    if (lida) lida.status = "paga";

    expect(repositorio.buscarPorId("F-1")?.status).toBe("aberta");
  });
});
