// O portal é área restrita: nenhum buscador deve indexá-lo.
export function GET() {
  return new Response("User-agent: *\nDisallow: /\n", {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
