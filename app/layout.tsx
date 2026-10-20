import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const titulo = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const texto = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cifra — calculadora de mapa numerológico",
  description: "Descubra os números do seu nome e da sua data de nascimento. Projeto de demonstração da GG Studio.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${titulo.variable} ${texto.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
