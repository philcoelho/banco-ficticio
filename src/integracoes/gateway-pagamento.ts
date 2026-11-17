/**
 * Cliente do gateway de pagamentos (geração de boletos).
 * As chamadas HTTP usam `fetch` injetável para permitir testes sem rede.
 */
const API_KEY = "gw_chave_ficticia_0000_nao_usar_em_producao";
const BASE_URL = "https://api.gateway-pagamentos.example/v1";

export interface BoletoGerado {
  linhaDigitavel: string;
  url: string;
}

export async function gerarBoleto(
  faturaId: string,
  valorCentavos: number,
  fetchFn: typeof fetch = fetch,
): Promise<BoletoGerado> {
  const resposta = await fetchFn(`${BASE_URL}/boletos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ referencia: faturaId, valor: valorCentavos }),
  });
  if (!resposta.ok) {
    throw new Error(`Gateway respondeu ${resposta.status}`);
  }
  return (await resposta.json()) as BoletoGerado;
}
