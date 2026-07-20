/** Cloudflare Worker entry point do portal (placeholder — Etapa 2). */
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Mesmos cabeçalhos de segurança do site. O portal é noindex e, quando ganhar
// login (Etapa 3), estes cabeçalhos já estarão no lugar.
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), browsing-topics=()",
};

const HSTS = "max-age=31536000; includeSubDomains; preload";

// Respostas sem corpo permitido — construí-las com um body dispara TypeError.
const BODYLESS_STATUSES = new Set([101, 204, 205, 304]);

function withSecurityHeaders(response: Response, url: URL): Response {
  const body = BODYLESS_STATUSES.has(response.status) ? null : response.body;
  const secured = new Response(body, response);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    secured.headers.set(name, value);
  }

  if (url.protocol === "https:") {
    secured.headers.set("Strict-Transport-Security", HSTS);
  }

  return secured;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const response = await handler.fetch(request, env, ctx);
    return withSecurityHeaders(response, url);
  },
};

export default worker;
