import type { Metadata } from "next";

export function createPageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
  path: "/" | "/privacidade";
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
