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
    return this.listarTodas().filter(
      (fatura) => fatura.documento === documento,
    );
  }

  listarTodas(): Fatura[] {
    return [...this.#faturas.values()].map((fatura) => ({ ...fatura }));
  }
}
