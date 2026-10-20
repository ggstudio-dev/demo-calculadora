// Numerologia pitagórica: tabela A=1 … I=9 em ciclos, redução com números mestres (11, 22, 33).
// Vogais: A, E, I, O, U (o Y conta como consoante, como na maioria das calculadoras brasileiras).

const MESTRES = new Set([11, 22, 33]);
const VOGAIS = new Set(["A", "E", "I", "O", "U"]);

function normalizar(c: string): string {
  return c.normalize("NFD").replace(/\p{M}/gu, "").toUpperCase();
}

export function valorLetra(c: string): number | null {
  const n = normalizar(c);
  if (!/^[A-Z]$/.test(n)) return null;
  return ((n.charCodeAt(0) - 65) % 9) + 1;
}

export function reduzir(n: number, mestres = true): number {
  while (n > 9 && !(mestres && MESTRES.has(n))) {
    n = [...String(n)].reduce((s, d) => s + Number(d), 0);
  }
  return n;
}

export function letras(nome: string): { letra: string; valor: number | null }[] {
  return [...nome].map((letra) => ({ letra, valor: valorLetra(letra) }));
}

function somaNome(nome: string, filtro: (letraNormalizada: string) => boolean): number {
  return [...nome].reduce((s, c) => {
    const v = valorLetra(c);
    return v !== null && filtro(normalizar(c)) ? s + v : s;
  }, 0);
}

export const expressao = (nome: string) => reduzir(somaNome(nome, () => true));
export const motivacao = (nome: string) => reduzir(somaNome(nome, (c) => VOGAIS.has(c)));
export const personalidade = (nome: string) => reduzir(somaNome(nome, (c) => !VOGAIS.has(c)));

function partesData(iso: string): { dia: number; mes: number; ano: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) throw new Error(`Data inválida: ${iso}`);
  const [ano, mes, dia] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(Date.UTC(ano, mes - 1, dia));
  if (d.getUTCFullYear() !== ano || d.getUTCMonth() !== mes - 1 || d.getUTCDate() !== dia) {
    throw new Error(`Data inválida: ${iso}`);
  }
  return { dia, mes, ano };
}

export function caminhoDeVida(iso: string): number {
  const { dia, mes, ano } = partesData(iso);
  return reduzir(reduzir(dia) + reduzir(mes) + reduzir(ano));
}

export function anoPessoal(iso: string, anoAtual: number): number {
  const { dia, mes } = partesData(iso);
  return reduzir(reduzir(dia, false) + reduzir(mes, false) + reduzir(anoAtual, false), false);
}
