import { describe, expect, it } from "vitest";
import {
  anoPessoal,
  caminhoDeVida,
  expressao,
  letras,
  motivacao,
  personalidade,
  reduzir,
  valorLetra,
} from "../app/numerologia";

describe("valorLetra (tabela pitagórica)", () => {
  it("A=1 … I=9, J=1 … R=9, S=1 … Z=8", () => {
    expect([..."ABCDEFGHI"].map(valorLetra)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect([..."JKLMNOPQR"].map(valorLetra)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect([..."STUVWXYZ"].map(valorLetra)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
  it("ignora maiúsculas/minúsculas e acentos; Ç vale como C", () => {
    expect(valorLetra("é")).toBe(5);
    expect(valorLetra("Ã")).toBe(1);
    expect(valorLetra("ç")).toBe(3);
  });
  it("devolve null para espaços, hífens e apóstrofos", () => {
    expect(valorLetra(" ")).toBeNull();
    expect(valorLetra("-")).toBeNull();
    expect(valorLetra("'")).toBeNull();
  });
});

describe("reduzir", () => {
  it("soma os algarismos até ficar um só", () => {
    expect(reduzir(14)).toBe(5);
    expect(reduzir(1990)).toBe(1);
    expect(reduzir(9)).toBe(9);
  });
  it("mantém os números mestres 11, 22 e 33", () => {
    expect(reduzir(29)).toBe(11);
    expect(reduzir(22)).toBe(22);
    expect(reduzir(33)).toBe(33);
    expect(reduzir(38)).toBe(11);
  });
  it("sem mestres quando pedido", () => {
    expect(reduzir(29, false)).toBe(2);
  });
});

describe("números do nome", () => {
  it("expressão soma todas as letras", () => {
    expect(expressao("Ana")).toBe(7);
    expect(expressao("Graça")).toBe(3);
  });
  it("acentos e maiúsculas não mudam o resultado", () => {
    expect(expressao("José")).toBe(expressao("JOSE"));
    expect(expressao("José")).toBe(4);
  });
  it("motivação usa só as vogais e personalidade só as consoantes", () => {
    expect(motivacao("Ana")).toBe(2);
    expect(personalidade("Ana")).toBe(5);
  });
  it("ignora espaços e hífens entre nomes", () => {
    expect(expressao("Ana Maria")).toBe(expressao("AnaMaria"));
    expect(expressao("Ana-Maria")).toBe(expressao("AnaMaria"));
  });
  it("letras devolve o valor de cada letra para mostrar ao escrever", () => {
    expect(letras("Jo ã")).toEqual([
      { letra: "J", valor: 1 },
      { letra: "o", valor: 6 },
      { letra: " ", valor: null },
      { letra: "ã", valor: 1 },
    ]);
  });
});

describe("números da data", () => {
  it("caminho de vida reduz dia, mês e ano e soma", () => {
    expect(caminhoDeVida("1990-07-15")).toBe(5);
  });
  it("caminho de vida mantém número mestre", () => {
    expect(caminhoDeVida("2000-08-01")).toBe(11);
  });
  it("ano pessoal usa dia e mês de nascimento com o ano atual, sem mestres", () => {
    // 15 → 6, 7, 2026 → 10 → 1 ; 6 + 7 + 1 = 14 → 5
    expect(anoPessoal("1990-07-15", 2026)).toBe(5);
  });
  it("data inválida lança erro", () => {
    expect(() => caminhoDeVida("1990-13-40")).toThrow();
    expect(() => caminhoDeVida("ontem")).toThrow();
  });
});
