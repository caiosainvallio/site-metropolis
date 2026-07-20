import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});

// O portal nunca é indexável: é área de acesso restrito, não material de busca.
export const metadata: Metadata = {
  title: "Portal — Metropolis Analytics",
  description: "Área de clientes da Metropolis Analytics.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={sourceSans.variable}><body>{children}</body></html>;
}
