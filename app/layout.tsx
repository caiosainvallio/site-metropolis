import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Metropolis Analytics",
    template: "%s | Metropolis Analytics",
  },
  description: "Parceria metodológica e estatística para pesquisas em saúde, do planejamento à comunicação dos resultados.",
  icons: { icon: "/logo-metropolis.png", shortcut: "/logo-metropolis.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={sourceSans.variable}><body>{children}</body></html>;
}
