/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

// Cabeçalhos de segurança aplicados a toda resposta. Content-Security-Policy
// fica de fora de propósito: o React Server Components injeta scripts inline e
// uma CSP sem `nonce` quebra a hidratação — falha invisível no HTML renderizado,
// visível só no navegador. Entra junto da decisão de hospedagem.
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

  // HSTS só sob HTTPS: enviá-lo em http://localhost faz o navegador passar a
  // forçar https em localhost, quebrando o dev de outros projetos na máquina.
  if (url.protocol === "https:") {
    secured.headers.set("Strict-Transport-Security", HSTS);
  }

  return secured;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const optimized = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);

      return withSecurityHeaders(optimized, url);
    }

    const response = await handler.fetch(request, env, ctx);

    return withSecurityHeaders(response, url);
  },
};

export default worker;
