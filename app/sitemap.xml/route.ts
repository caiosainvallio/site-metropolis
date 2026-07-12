function requestOrigin(request: Request) {
  return new URL(request.url).origin;
}

export function GET(request: Request) {
  const origin = requestOrigin(request);
  const routes = ["/", "/privacidade"];
  const body = routes.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
