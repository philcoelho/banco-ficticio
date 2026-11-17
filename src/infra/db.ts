/**
 * Acesso ao banco de dados. Use sempre parâmetros posicionais ("?") para
 * valores vindos de fora; nunca monte SQL concatenando texto.
 */
export interface Db {
  all<T>(sql: string, params?: readonly unknown[]): Promise<T[]>;
  run(sql: string, params?: readonly unknown[]): Promise<void>;
}
