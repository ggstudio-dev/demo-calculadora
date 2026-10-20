// Cada número tem uma cor e uma forma: 1 círculo, 2 dois círculos, 3 a 9 polígonos com esse número de lados.
// Números mestres (11, 22, 33) usam a forma da sua soma (2, 4, 6) com um contorno duplo dourado.

export const COR: Record<number, string> = {
  1: "#e4572e",
  2: "#f29e4c",
  3: "#e9c46a",
  4: "#2a9d8f",
  5: "#3a86c8",
  6: "#5e60ce",
  7: "#7b2cbf",
  8: "#c2185b",
  9: "#264653",
};

const base = (n: number) => (n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n);
export const corDe = (n: number) => COR[base(n)] ?? "#1d1a2b";

function poligono(lados: number, r: number) {
  return Array.from({ length: lados }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / lados;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

function Desenho({ n, r, cor, preenchida }: { n: number; r: number; cor: string; preenchida: boolean }) {
  const props = { fill: preenchida ? cor : "none", stroke: cor, strokeWidth: preenchida ? 0 : 3 };
  if (n === 1) return <circle cx="50" cy="50" r={r} {...props} />;
  if (n === 2)
    return (
      <g style={{ mixBlendMode: "multiply" }}>
        <circle cx={50 - r * 0.35} cy="50" r={r * 0.7} {...props} />
        <circle cx={50 + r * 0.35} cy="50" r={r * 0.7} {...props} />
      </g>
    );
  return <polygon points={poligono(n, r)} {...props} />;
}

export function Forma({ numero, className = "", rotulo = true }: { numero: number; className?: string; rotulo?: boolean }) {
  const b = base(numero);
  const mestre = b !== numero;
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={`Número ${numero}`}>
      {mestre && <Desenho n={b} r={46} cor="#c9a227" preenchida={false} />}
      <Desenho n={b} r={mestre ? 36 : 44} cor={corDe(numero)} preenchida />
      {rotulo && (
        <text
          x="50"
          y="50"
          dy="0.36em"
          textAnchor="middle"
          fontSize={numero > 9 ? 26 : 34}
          fontWeight={700}
          fill={b === 2 || b === 3 ? "#1d1a2b" : "#fff"}
          fontFamily="var(--font-bricolage), sans-serif"
        >
          {numero}
        </text>
      )}
    </svg>
  );
}
