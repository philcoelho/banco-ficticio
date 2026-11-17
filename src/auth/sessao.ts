import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Sessões do internet banking.
 * Token: "<usuarioId>.<expiraEm>.<assinatura>", em que expiraEm é o instante
 * de expiração em segundos (epoch) e a assinatura é o HMAC-SHA256 em hex de
 * "<usuarioId>.<expiraEm>" com o segredo de sessão (SESSAO_SEGREDO, ver
 * .env.schema). O segredo chega por parâmetro; este módulo não lê ambiente.
 */
export interface Sessao {
  usuarioId: string;
  expiraEm: number;
}

function assinatura(conteudo: string, segredo: string): string {
  return createHmac("sha256", segredo).update(conteudo).digest("hex");
}

export function emitirToken(sessao: Sessao, segredo: string): string {
  const conteudo = `${sessao.usuarioId}.${sessao.expiraEm}`;
  return `${conteudo}.${assinatura(conteudo, segredo)}`;
}

/** Devolve a sessão se o token for autêntico e não estiver expirado. */
export function validarSessao(
  token: string,
  agoraEmSegundos: number,
  segredo: string,
): Sessao | undefined {
  const partes = token.split(".");
  if (partes.length !== 3) {
    return undefined;
  }
  const [usuarioId = "", expiraTexto = "", recebida = ""] = partes;
  if (usuarioId === "" || !/^\d+$/.test(expiraTexto)) {
    return undefined;
  }

  const esperada = Buffer.from(
    assinatura(`${usuarioId}.${expiraTexto}`, segredo),
    "hex",
  );
  const informada = Buffer.from(recebida, "hex");
  if (
    informada.length !== esperada.length ||
    !timingSafeEqual(informada, esperada)
  ) {
    return undefined;
  }

  const expiraEm = Number(expiraTexto);
  if (agoraEmSegundos >= expiraEm) {
    return undefined;
  }
  return { usuarioId, expiraEm };
}
