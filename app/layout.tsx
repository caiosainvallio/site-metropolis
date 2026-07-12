import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metropolis Analytics | Consultoria metodológica e estatística",
  description: "Planejamento estatístico e análise completa para pesquisas de mestrado e doutorado na área da saúde.",
  icons: { icon: "/logo-metropolis.png", shortcut: "/logo-metropolis.png" },
  openGraph: {
    title: "Metropolis Analytics",
    description: "Método claro. Evidência sólida.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Metropolis Analytics — Método claro. Evidência sólida." }],
  },
  twitter: { card: "summary_large_image", title: "Metropolis Analytics", description: "Método claro. Evidência sólida.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
