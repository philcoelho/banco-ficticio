import type { Fatura } from "./tipos.ts";

/** Repositório em memória. Em produção, a implementação usa o banco de dados. */
export class RepositorioFaturas {
  readonly #faturas = new Map<string, Fatura>();

  salvar(fatura: Fatura): void {
    this.#faturas.set(fatura.id, { ...fatura });
  }

  buscarPorId(id: string): Fatura | undefined {
    const fatura = this.#faturas.get(id);
    return fatura ? { ...fatura } : undefined;
  }

  listarPorDocumento(documento: string): Fatura[] {
    const faturas = this.listarTodas().filter(
      (fatura) => fatura.documento === documento,
    );
    console.info(
      `[auditoria] consulta de faturas: documento=${documento} resultados=${faturas.length}`,
    );
    return faturas;
  }

  listarTodas(): Fatura[] {
    return [...this.#faturas.values()].map((fatura) => ({ ...fatura }));
  }
}
