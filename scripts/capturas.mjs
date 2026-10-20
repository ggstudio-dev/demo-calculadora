// Capturas de ecrã para rever o site antes de entregar (telemóvel 390 px e computador 1440 px).
// Uso: npm run build && npm start (noutro terminal) e depois: npm run capturas [-- http://localhost:3000/]
// Faz scroll até ao fim (para carregar imagens "lazy") e regista erros da consola.
// Navegador: no Windows usa o Edge; na nuvem usa o Chromium em PW_CHROMIUM (ex.: /opt/pw-browsers/chromium).
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000/";
const pasta = "capturas";
mkdirSync(pasta, { recursive: true });

const opcoes = process.env.PW_CHROMIUM
  ? { executablePath: process.env.PW_CHROMIUM }
  : process.platform === "win32"
    ? { channel: "msedge" }
    : {};
const navegador = await chromium.launch(opcoes);
const erros = [];

for (const [nome, largura, altura] of [["telemovel", 390, 844], ["computador", 1440, 900]]) {
  const pagina = await navegador.newPage({ viewport: { width: largura, height: altura } });
  pagina.on("console", (m) => m.type() === "error" && erros.push(`${nome}: ${m.text()}`));
  pagina.on("pageerror", (e) => erros.push(`${nome}: ${e.message}`));
  await pagina.goto(url, { waitUntil: "networkidle" });
  await pagina.screenshot({ path: `${pasta}/${nome}-inicio.png` });
  const alturaTotal = await pagina.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < alturaTotal; y += 500) {
    await pagina.mouse.wheel(0, 500);
    await pagina.waitForTimeout(120);
  }
  await pagina.waitForTimeout(2000);
  await pagina.evaluate(() => window.scrollTo(0, 0));
  await pagina.screenshot({ path: `${pasta}/${nome}-completo.png`, fullPage: true });
  await pagina.close();
}

await navegador.close();
console.log(`Capturas em ./${pasta}/`);
console.log(erros.length ? `Erros na consola:\n${erros.join("\n")}` : "Sem erros na consola.");
