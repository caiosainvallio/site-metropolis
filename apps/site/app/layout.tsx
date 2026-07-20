import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { SITE_URL } from "./site-metadata";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Metropolis Analytics",
    template: "%s | Metropolis Analytics",
  },
  description: "Assessoria metodológica e estatística para pesquisa, do planejamento à interpretação dos resultados.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-metropolis.png" },
    ],
    shortcut: "/logo-metropolis.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={sourceSans.variable}><body>{children}</body></html>;
}
