@AGENTS.md

# Projeto GG Studio — regras de trabalho

Este repositório foi criado a partir do modelo `ggstudio-dev/modelo-site`. É **um** projeto (demo de portfólio ou trabalho de cliente) da GG Studio, de Guilherme (brasileiro, a viver em Portugal). Estas regras valem tanto no PC como numa sessão do Claude Code na nuvem (que só vê este repositório).

## Como falar comigo (Guilherme)
- Responder em **português de Portugal**.
- Explicar passo a passo tudo o que eu tiver de fazer (onde tocar, o que copiar, o que significa cada termo). Muitas vezes estou só com o telemóvel.
- No fim de cada entrega: resumo curto do que foi feito + **link de pré-visualização da Vercel** para eu ver no telemóvel.

## Antes de começar
1. Ler `materiais/BRIEFING.md` (se existir): anúncio original, proposta enviada, valor e prazo combinados, mensagem do cliente.
2. Ver os ficheiros em `materiais/` (logótipo, textos, fotos do cliente).
3. Se faltar informação essencial, perguntar **uma vez**, com tudo o que falta numa só mensagem. Para o resto, escolher valores sensatos e dizer quais foram.

## Stack
- Next.js (App Router, TypeScript) + Tailwind CSS. Deploy na Vercel (equipa GG Studio, projeto ligado a este repositório).
- Sites simples: sem base de dados, sem login, sem dependências desnecessárias.
- Formulários: enviar por email/WhatsApp/Google Sheets conforme o briefing; nunca guardar dados pessoais sem necessidade.

## Peças já prontas (em `app/componentes/`)
- `FormularioContacto` — formulário com consentimento RGPD. `demo` para demos; num cliente real passar `aoEnviar` (ex.: rota `/api/contacto` que envia email) e configurar o envio com o Guilherme.
- `BotaoWhatsApp` — com `numero` abre o WhatsApp; sem número (demos) explica o que faria.
- `PoliticaPrivacidade` — usar numa página `app/privacidade/page.tsx`; confirmar os dados do responsável com o cliente.
- Estilizar sempre por props/classes para o projeto ter identidade própria — nunca deixar o aspeto "cinzento por defeito".
- Com botão flutuante (WhatsApp), dar ao rodapé espaço em baixo (ex.: `pb-28`) para não tapar links.

## Configuração que não se pode perder
- `next.config.ts` traz a regra `turbopack.rules["*.css"]` com `@tailwindcss/turbopack`: **sem ela o site fica sem estilos** (e o build passa na mesma!). Ao acrescentar opções (redirects, etc.), editar — nunca reescrever o ficheiro.
- Sites em várias línguas: rotas `app/[lingua]/…` com `generateStaticParams`, dicionários em TS e redirect de `/` para a língua principal no `next.config.ts` (ver demo-advocacia).

## Verificar antes de entregar
- `npm run build`, `npx eslint .` e depois `npm start` + `npm run capturas` → ver as imagens em `capturas/` (telemóvel e computador) e os erros da consola. Rever com olhos de cliente: textos cortados, elementos sobrepostos, botões flutuantes a tapar conteúdo, mapas no sítio certo.
- Testar as interações principais (separadores, formulários, botões) num navegador real, não só "compila".

## Imagens
- Fotografias livres: Wikimedia Commons (API pública; filtrar licenças CC0 / domínio público / CC BY) — guardar em `public/`, importar com `next/image` e **dar crédito** (autor + licença) no rodapé ou na legenda. Unsplash/Pexels pedem chave de API.
- Lançamentos "em planta" não têm fotos reais: usar fotos da cidade/bairro (identificadas como ilustrativas) + plantas/ilustrações em SVG.

## Animação
- Bem-vinda quando tem propósito (ex.: plantas que se desenham, fachada interativa, uma abertura coreografada). Preferir CSS (keyframes, `animation-timeline` com `@supports`, IntersectionObserver) a bibliotecas pesadas.
- Sempre com `@media (prefers-reduced-motion: reduce)` a desligar.
- Cuidado com transições de opacidade que partem de "opaco" (clarões): animar uma camada separada de 0 → valor.

## Qualidade
- Usar a skill `frontend-design` para qualquer interface: o resultado não pode parecer um modelo genérico.
- Mobile-first; testar a largura de telemóvel (360–414 px) antes de entregar.
- Acessibilidade básica: contraste, `alt` nas imagens, labels nos formulários, navegação por teclado.
- Performance: imagens com `next/image`, fontes com `next/font`, sem bibliotecas pesadas para coisas simples.
- Sites simples dispensam TDD; lógica (calculadoras, regras de preço, validações) leva testes.
- Antes de entregar a um cliente: correr `/code-review` e corrigir o que for importante.

## Conteúdo e idioma
- Textos na língua do cliente: **PT-PT** para Portugal, **PT-BR** para o Brasil, inglês/espanhol conforme o briefing. Nunca misturar PT-PT e PT-BR.
- Sites para a UE: aviso de cookies (só se houver cookies não essenciais), política de privacidade, consentimento explícito nos formulários (RGPD).
- Demos de portfólio: conteúdo **fictício** (empresa, nomes, moradas, telefones inventados e claramente de exemplo), imagens livres de direitos, aviso discreto "Projeto de demonstração — GG Studio".

## Regras que nunca se quebram
- Nunca fazer commit de `.env*` (exceto `.env.example`), chaves ou palavras-passe. Segredos só nas variáveis da Vercel.
- Commits com o email `328416565+guilherme-ggstudio@users.noreply.github.com` (`git config user.email …` no repositório). Com outro email a Vercel **bloqueia** o deploy ("Vercel user not found").
- No Windows, nunca terminar processos por nome (`taskkill /IM node.exe`): mata outras sessões do Guilherme. Terminar só o PID do servidor que se arrancou.
- Nunca reutilizar código, textos ou imagens de **outro cliente**. O que for genérico e reutilizável volta ao `modelo-site`, nunca de cliente para cliente.
- Nunca pôr contactos do Guilherme (email, telefone, WhatsApp) em demos ou pré-visualizações enviadas pelas plataformas — as plataformas proíbem levar o cliente para fora.
- Pré-visualizações para clientes: `noindex` até à entrega final.

## Checklist de entrega
- [ ] Briefing cumprido ponto por ponto (listar no resumo final)
- [ ] Testado em telemóvel e computador
- [ ] Sem erros na consola nem no `npm run build`
- [ ] Textos revistos (idioma certo, sem "lorem ipsum")
- [ ] RGPD (se UE): privacidade + consentimento nos formulários
- [ ] Link da Vercel enviado ao Guilherme
