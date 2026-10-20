import { Calculadora } from "./componentes/Calculadora";
import { Forma } from "./componentes/Forma";

export default function Pagina() {
  return (
    <>
      <p className="bg-tinta px-4 py-2 text-center text-sm text-fundo/85">
        Projeto de demonstração criado pela GG Studio.
      </p>

      <header className="mx-auto flex max-w-4xl items-center gap-3 px-4 pt-8 sm:px-6">
        <div aria-hidden="true" className="flex -space-x-2">
          {[1, 3, 4, 5].map((n) => (
            <Forma key={n} numero={n} rotulo={false} className="size-7" />
          ))}
        </div>
        <p className="font-titulo text-2xl font-bold">Cifra</p>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-12 pb-24 sm:px-6">
        <h1 className="max-w-2xl font-titulo text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-7xl">
          Seu nome e sua data, em números.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta/75">
          Cada letra vale um número de 1 a 9. Escreva seu nome completo e veja, letra a letra, como se forma o seu
          mapa numerológico.
        </p>

        <div className="mt-10">
          <Calculadora />
        </div>

        <section className="mt-20 rounded-3xl bg-white p-6 sm:p-8">
          <h2 className="font-titulo text-2xl font-bold">Como calculamos</h2>
          <p className="mt-3 max-w-prose leading-relaxed text-tinta/80">
            Usamos a tabela pitagórica: A, J e S valem 1; B, K e T valem 2; e assim por diante até I e R, que valem 9.
            Acentos e cedilha não mudam o valor. Somamos os algarismos até sobrar um só, exceto os números mestres 11,
            22 e 33, que mantemos.
          </p>
        </section>
      </main>

      <footer className="border-t border-tinta/10 px-4 py-10 text-sm text-tinta/65 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-2">
          <p>Para entretenimento. Não substitui aconselhamento profissional de nenhum tipo.</p>
          <p>Seu nome e sua data ficam só no seu navegador: nada é enviado nem guardado.</p>
          <p>Calculadora de demonstração desenhada e desenvolvida pela GG Studio.</p>
        </div>
      </footer>
    </>
  );
}
