// Textos curtos em português do Brasil. Tom leve: é uma ferramenta de entretenimento.

export const SIGNIFICADOS: Record<number, { titulo: string; texto: string }> = {
  1: { titulo: "Iniciativa", texto: "Gosta de começar coisas e de decidir por conta própria. Funciona melhor quando tem espaço para liderar." },
  2: { titulo: "Parceria", texto: "Percebe o que os outros sentem antes de eles falarem. Rende mais em dupla do que sozinho." },
  3: { titulo: "Expressão", texto: "Comunica com facilidade e tem humor. Precisa de um canal criativo para não se dispersar." },
  4: { titulo: "Estrutura", texto: "Organiza, planeja e termina o que começa. É a pessoa em quem os outros confiam para o trabalho sério." },
  5: { titulo: "Movimento", texto: "Curioso e inquieto, aprende mudando de lugar e de assunto. A rotina rígida cansa rápido." },
  6: { titulo: "Cuidado", texto: "Assume responsabilidade pela casa, pela família e pelos amigos. Precisa lembrar de cuidar de si também." },
  7: { titulo: "Análise", texto: "Gosta de entender como as coisas funcionam por dentro. Precisa de silêncio e tempo para pensar." },
  8: { titulo: "Realização", texto: "Tem faro para resultados, dinheiro e gestão. Cresce quando assume projetos grandes." },
  9: { titulo: "Generosidade", texto: "Pensa no coletivo e se envolve com causas. Fecha ciclos com facilidade e começa outros." },
  11: { titulo: "Intuição (número mestre)", texto: "Uma versão intensa do 2: sensibilidade alta e ideias que inspiram os outros, com tendência à ansiedade." },
  22: { titulo: "Construção (número mestre)", texto: "Uma versão ampliada do 4: capacidade de transformar visões grandes em algo concreto e duradouro." },
  33: { titulo: "Dedicação (número mestre)", texto: "Uma versão ampliada do 6: vocação para ensinar e cuidar em escala, às vezes à custa de si mesmo." },
};

export const POSICOES = {
  caminho: { nome: "Caminho de vida", sobre: "Calculado pela data de nascimento. Mostra a direção geral da sua vida." },
  expressao: { nome: "Expressão", sobre: "Todas as letras do nome. Mostra os seus talentos naturais." },
  motivacao: { nome: "Motivação", sobre: "As vogais do nome. Mostra o que move você por dentro." },
  personalidade: { nome: "Personalidade", sobre: "As consoantes do nome. Mostra como os outros veem você." },
  ano: { nome: "Ano pessoal", sobre: "Dia e mês de nascimento com o ano atual. Mostra o tema deste ano." },
} as const;

export type Posicao = keyof typeof POSICOES;
