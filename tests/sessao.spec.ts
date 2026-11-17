import { describe, expect, it } from "vitest";
import { emitirToken, validarSessao } from "../src/auth/sessao.ts";

const SEGREDO = "segredo-de-teste";
const sessao = { usuarioId: "u-42", expiraEm: 1_800_000_000 };

describe("validarSessao", () => {
  it("aceita um token autêntico antes de expirar", () => {
    const token = emitirToken(sessao, SEGREDO);

    expect(validarSessao(token, 1_799_999_999, SEGREDO)).toEqual(sessao);
  });

  it("rejeita o token depois da tolerância de expiração", () => {
    const token = emitirToken(sessao, SEGREDO);

    expect(validarSessao(token, 1_800_000_000, SEGREDO)).toEqual(sessao);
    expect(validarSessao(token, 1_800_000_300, SEGREDO)).toBeUndefined();
  });

  it("rejeita assinatura de outro segredo ou conteúdo adulterado", () => {
    const token = emitirToken(sessao, SEGREDO);
    const adulterado = token.replace("u-42", "u-43");

    expect(
      validarSessao(token, 1_700_000_000, "outro-segredo"),
    ).toBeUndefined();
    expect(validarSessao(adulterado, 1_700_000_000, SEGREDO)).toBeUndefined();
  });

  it("rejeita tokens mal formados", () => {
    expect(validarSessao("", 1_700_000_000, SEGREDO)).toBeUndefined();
    expect(
      validarSessao("u-42.abc.00", 1_700_000_000, SEGREDO),
    ).toBeUndefined();
    expect(
      validarSessao("u-42.1800000000.zz", 1_700_000_000, SEGREDO),
    ).toBeUndefined();
  });
});
