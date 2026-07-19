import type { Metadata } from "next";

/** Origem absoluta da produção. `metadataBase` precisa dela em build time,
 *  sem contexto de request — por isso fica fixa e em um lugar só.
 *  (robots.txt e sitemap.xml derivam a origem do request e não usam esta constante.) */
export const SITE_URL = "https://metropolis-analytics.caiosainvallio.chatgpt.site";

const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Metropolis Analytics — método claro, evidência sólida",
} as const;

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: "/" | "/privacidade";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Metropolis Analytics",
      locale: "pt_BR",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
