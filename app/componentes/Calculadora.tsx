"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { anoPessoal, caminhoDeVida, expressao, letras, motivacao, personalidade } from "../numerologia";
import { POSICOES, SIGNIFICADOS, type Posicao } from "../significados";
import { corDe, Forma } from "./Forma";

type Mapa = Record<Posicao, number>;

function calcular(nome: string, data: string, anoAtual: number): Mapa | null {
  if (letras(nome).filter((l) => l.valor !== null).length < 2) return null;
  try {
    return {
      caminho: caminhoDeVida(data),
      expressao: expressao(nome),
      motivacao: motivacao(nome),
      personalidade: personalidade(nome),
      ano: anoPessoal(data, anoAtual),
    };
  } catch {
    return null;
  }
}

// Valores que só existem no navegador (link partilhado e ano atual). No servidor/pré-geração devolvem um valor
// neutro, por isso não há `new Date()` nem `window` durante o build.
const semSubscricao = () => () => {};
const usePesquisa = () => useSyncExternalStore(semSubscricao, () => window.location.search, () => "");
const useAnoAtual = () => useSyncExternalStore(semSubscricao, () => new Date().getFullYear(), () => null);

export function Calculadora() {
  const pesquisa = usePesquisa();
  const anoAtual = useAnoAtual();
  const q = new URLSearchParams(pesquisa);
  // A `key` recria o formulário quando o link partilhado é lido, já com o nome e a data preenchidos.
  return (
    <FormularioMapa key={pesquisa} nomeInicial={q.get("nome") ?? ""} dataInicial={q.get("data") ?? ""} anoAtual={anoAtual} />
  );
}

function FormularioMapa({ nomeInicial, dataInicial, anoAtual }: { nomeInicial: string; dataInicial: string; anoAtual: number | null }) {
  const [nome, setNome] = useState(nomeInicial);
  const [data, setData] = useState(dataInicial);
  const [copiado, setCopiado] = useState(false);
  const mapa = useMemo(() => (anoAtual === null ? null : calcular(nome, data, anoAtual)), [nome, data, anoAtual]);

  async function partilhar() {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams({ nome, data }).toString();
    const link = url.toString();
    // No telemóvel abre a partilha nativa (WhatsApp, Instagram…); no computador copia o link.
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title: "Meu mapa numerológico", url: link });
        return;
      } catch {
        // cancelado: cai para copiar
      }
    }
    await navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  const campo =
    "mt-2 w-full rounded-xl border-2 border-tinta/15 bg-white px-4 py-3.5 text-lg text-tinta focus:border-tinta focus:outline-none";

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-5 sm:grid-cols-[2fr_1fr]">
        <label className="block">
          <span className="font-semibold">Nome completo</span>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            placeholder="Como está na certidão de nascimento"
            className={campo}
          />
        </label>
        <label className="block">
          <span className="font-semibold">Data de nascimento</span>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} className={campo} />
        </label>
      </form>

      {/* Fita de letras: cada letra mostra o seu valor enquanto a pessoa escreve */}
      <div aria-hidden="true" className={`flex flex-wrap gap-x-1 gap-y-3 ${nome ? "mt-6 min-h-20" : ""}`}>
        {letras(nome).map((l, i) =>
          l.valor === null ? (
            <span key={i} className="w-3" />
          ) : (
            <span key={i} className="letra flex w-7 flex-col items-center">
              <span className="font-titulo text-lg leading-none">{l.letra.toUpperCase()}</span>
              <span
                className="mt-1.5 flex size-6 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: corDe(l.valor), color: l.valor === 2 || l.valor === 3 ? "#1d1a2b" : "#fff" }}
              >
                {l.valor}
              </span>
            </span>
          ),
        )}
      </div>

      <section aria-live="polite" aria-label="Resultado" className="mt-8">
        {!mapa ? (
          <p className="rounded-2xl border-2 border-dashed border-tinta/20 px-6 py-10 text-center text-tinta/60">
            Escreva o nome completo e escolha a data de nascimento para ver o seu mapa.
          </p>
        ) : (
          <div key={Object.values(mapa).join("-")}>
            <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-5 sm:grid-cols-[1.4fr_1fr_1fr] sm:grid-rows-2 sm:p-8">
              {(Object.keys(POSICOES) as Posicao[]).map((p, i) => (
                <figure
                  key={p}
                  className={`forma-entrar flex flex-col items-center text-center ${
                    i === 0 ? "col-span-2 sm:col-span-1 sm:row-span-2 sm:justify-center" : ""
                  }`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <Forma numero={mapa[p]} className={i === 0 ? "size-40 sm:size-56" : "size-20 sm:size-24"} />
                  <figcaption className={`mt-2 font-semibold ${i === 0 ? "text-lg" : "text-sm"}`}>{POSICOES[p].nome}</figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={partilhar}
                className="rounded-full bg-tinta px-6 py-3 font-semibold text-fundo hover:bg-tinta/85"
              >
                Compartilhar resultado
              </button>
              <span role="status" className="text-sm text-tinta/70">
                {copiado ? "Link copiado." : ""}
              </span>
            </div>

            <dl className="mt-12 space-y-8">
              {(Object.keys(POSICOES) as Posicao[]).map((p) => {
                const s = SIGNIFICADOS[mapa[p]];
                return (
                  <div key={p} className="grid grid-cols-[3.5rem_1fr] gap-4 sm:grid-cols-[4.5rem_1fr]">
                    <Forma numero={mapa[p]} rotulo={false} className="size-14 sm:size-18" />
                    <div>
                      <dt className="font-titulo text-2xl">
                        {POSICOES[p].nome} {mapa[p]}: {s.titulo}
                      </dt>
                      <dd className="mt-1.5 max-w-prose leading-relaxed">{s.texto}</dd>
                      <dd className="mt-1 text-sm text-tinta/60">{POSICOES[p].sobre}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        )}
      </section>
    </div>
  );
}
