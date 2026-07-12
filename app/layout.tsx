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
  description: "Apoio metodológico e estatístico para pesquisas em saúde, da pergunta científica à comunicação dos achados.",
  icons: { icon: "/logo-metropolis.png", shortcut: "/logo-metropolis.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={sourceSans.variable}><body>{children}</body></html>;
}
