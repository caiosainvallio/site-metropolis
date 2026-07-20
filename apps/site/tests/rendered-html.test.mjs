import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const forbiddenPolicy = JSON.parse(
  await readFile(new URL("config/forbidden-content.json", root), "utf8"),
);

async function render(pathname = "/", origin = "http://localhost") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, origin), {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function renderedHtml(pathname = "/") {
  const response = await render(pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

function assertInOrder(html, fragments) {
  let cursor = -1;
  for (const fragment of fragments) {
    const next = html.indexOf(fragment, cursor + 1);
    assert.ok(next > cursor, `Esperava ${JSON.stringify(fragment)} depois do item anterior`);
    cursor = next;
  }
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

test("renderiza a landing única na ordem planejada", async () => {
  const html = await renderedHtml();

  assert.match(html, /<title>Assessoria metodológica e estatística \| Metropolis Analytics<\/title>/i);
  assert.match(html, /Sua pesquisa merece um método que se sustenta/i);
  assert.match(html, /Três situações, o mesmo problema de fundo/i);
  assert.match(html, /Assessoria que percorre o estudo inteiro/i);
  assert.match(html, /Reuniões até a explicação ser sua/i);
  assert.match(html, /Não oferecemos análise qualitativa/i);

  assertInOrder(html, [
    'id="inicio"',
    'id="para-quem"',
    'id="o-que-trava"',
    'id="como-ajudamos"',
    'id="cobertura"',
    'id="reunioes"',
    'id="como-funciona"',
    'id="modalidades"',
    'id="quem-conduz"',
    'id="faq"',
    'id="contato"',
  ]);

  // Guarda contra uma cópia velha da home anterior.
  assert.doesNotMatch(html, /id="quem-somos"/i);
  assert.doesNotMatch(html, /id="mapa-metodologico"/i);
});

test("publica a cobertura metodológica verificada", async () => {
  const html = await renderedHtml();

  // Os 8 desenhos de docs/matriz-cobertura-metodologica.md
  for (const design of [
    "Estudos transversais",
    "Coortes",
    "Estudos caso-controle",
    "Ensaios clínicos",
    "Estudos diagnósticos",
    "Validação de instrumentos",
    "Revisões sistemáticas e meta-análises",
    "Avaliações econômicas em saúde",
  ]) {
    assert.ok(html.includes(design), `Desenho ausente na cobertura: ${design}`);
  }

  // As 6 etapas da jornada
  assertInOrder(html, [
    "Desenhos atendidos",
    "Etapas do estudo",
    "Planejamento",
    "Banco de dados",
    "Interpretação",
    "Comunicação",
  ]);
});

test("não publica padrões bloqueados pela política de conteúdo", async () => {
  const [home, privacy] = await Promise.all([renderedHtml(), renderedHtml("/privacidade")]);
  const publicHtml = `${home}\n${privacy}`;

  for (const item of forbiddenPolicy.blockedPatterns) {
    const pattern = new RegExp(item.pattern, item.flags);
    assert.doesNotMatch(publicHtml, pattern, `Conteúdo bloqueado encontrado: ${item.id}`);
  }

  assert.doesNotMatch(publicHtml, /(?:https?:\/\/[^"'\s>]+)?\/reports?\//iu);
});

test("mantém landmarks, h1 único, skip link e nomes acessíveis na homepage", async () => {
  const html = await renderedHtml();

  assert.match(html, /^<!DOCTYPE html>/i);
  assert.match(html, /<html[^>]+lang="pt-BR"/i);
  assert.equal(count(html, /<header\b/gi), 1);
  assert.equal(count(html, /<main\b/gi), 1);
  assert.equal(count(html, /<footer\b/gi), 1);
  assert.equal(count(html, /<h1\b/gi), 1);
  assert.ok(count(html, /<h2\b/gi) >= 10, "Alguma seção perdeu o próprio h2");
  assert.match(html, /<a[^>]+class="skip-link"[^>]+href="#conteudo"[^>]*>Pular para o conteúdo principal<\/a>/i);
  assert.match(html, /<main[^>]+id="conteudo"/i);
  assert.match(html, /aria-label="Metropolis Analytics — início"/i);
  assert.doesNotMatch(html, /<img(?![^>]*\balt=)[^>]*>/i);

  // Navegação: desktop + móvel, ambas rotuladas
  assert.equal(count(html, /aria-label="Navegação principal"/gi), 2);
  assert.match(html, /<button[^>]+class="nav-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="menu-mobile"/i);
  assert.match(html, /<nav[^>]+id="menu-mobile"/i);

  // FAQ: 7 itens, o primeiro aberto no primeiro paint
  assert.equal(count(html, /aria-controls="faq-answer-/gi), 7);
  assert.match(html, /aria-expanded="true"/i);
});

test("expõe apenas Caio como contato principal com mensagem de triagem", async () => {
  const html = await renderedHtml();

  assert.match(html, /href="https:\/\/wa\.me\/5511980158332\?text=/i);
  assert.match(html, /Tipo(?:%20|\+)de(?:%20|\+)projeto/i);
  assert.match(html, /Etapa(?:%20|\+)atual/i);
  assert.match(html, /Principal(?:%20|\+)d%C3%BAvida(?:%20|\+)ou(?:%20|\+)necessidade/i);
  assert.match(html, /Prazo(?:%20|\+)relevante/i);
  assert.match(html, /com Caio Sain Vallio no WhatsApp \(abre em nova aba\)/i);
  assert.doesNotMatch(html, /wa\.me\/5511957163477/i);

  // nav desktop, nav móvel, hero e CTA final
  assert.equal(count(html, /href="https:\/\/wa\.me\/5511980158332\?text=/gi), 4);

  for (const match of html.matchAll(/<a[^>]+href="https:\/\/wa\.me\/[^"]+"[^>]*>/gi)) {
    assert.match(match[0], /target="_blank"/i);
    assert.match(match[0], /rel="noopener noreferrer"/i);
  }
});

test("expõe os quatro destinos profissionais e rotula as buscas públicas", async () => {
  const html = await renderedHtml();
  const destinations = [
    "https://www.linkedin.com/in/caiosainvallio/",
    "https://scholar.google.com/scholar?q=%22Caio+Sain+Vallio%22",
    "https://www.linkedin.com/in/vitor-vallio/",
    "https://www.google.com/search?q=site%3Alattes.cnpq.br+%22Vitor+Sain+Vallio%22",
  ];

  for (const href of destinations) {
    const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replaceAll("&", "(?:&|&amp;)");
    assert.match(html, new RegExp(`href="${escaped}"[^>]*target="_blank"[^>]*rel="noopener noreferrer"`, "i"));
  }
  assert.match(html, /Google Acadêmico[\s\S]*busca pública, abre em nova aba/i);
  assert.match(html, /Currículo Lattes[\s\S]*busca pública restrita ao Lattes, abre em nova aba/i);
  assert.equal(count(html, /class="profile-links"/gi), 2);
});

test("renderiza /privacidade e mantém navegação interna para a política", async () => {
  const [home, privacy] = await Promise.all([renderedHtml(), renderedHtml("/privacidade")]);

  assert.match(home, /href="\/privacidade"[^>]*>Política de Privacidade<\/a>/i);
  assert.match(privacy, /<title>Política de Privacidade \| Metropolis Analytics<\/title>/i);
  assert.equal(count(privacy, /<h1\b/gi), 1);
  assert.match(privacy, /Sem formulário próprio/i);
  assert.match(privacy, /Links e serviços de terceiros/i);
  assert.match(privacy, /Dados técnicos de hospedagem/i);
  assert.match(privacy, /confidencialidade dos projetos/i);
  assert.match(privacy, /Solicitações sobre privacidade/i);
  assert.match(privacy, /class="skip-link"[^>]+href="#conteudo"/i);
  assert.match(privacy, /aria-label="Nesta página"/i);
  assertInOrder(privacy, ['id="visita"', 'id="terceiros"', 'id="dados-tecnicos"', 'id="projetos"', 'id="solicitacoes"']);

  // Guarda da migração para .wrap: sem isso a rota renderiza sem contêiner
  // e nenhum outro teste perceberia.
  assert.match(privacy, /class="wrap/i);
});

test("aplica cabeçalhos de segurança nas respostas do worker", async () => {
  for (const pathname of ["/", "/privacidade"]) {
    const response = await render(pathname);

    assert.equal(response.headers.get("x-content-type-options"), "nosniff", pathname);
    assert.equal(response.headers.get("x-frame-options"), "DENY", pathname);
    assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin", pathname);
    assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/, pathname);

    // A resposta continua íntegra depois de ser reconstruída com os cabeçalhos.
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<\/html>/i);
  }
});

test("envia HSTS apenas sob https", async () => {
  const insecure = await render("/", "http://localhost");
  const secure = await render("/", "https://metropolis.test");

  // Em http o cabeçalho não vai: enviá-lo faria o navegador forçar https
  // em localhost, quebrando o desenvolvimento local.
  assert.equal(insecure.headers.get("strict-transport-security"), null);
  assert.match(secure.headers.get("strict-transport-security") ?? "", /max-age=31536000/);
});

test("declara salvaguardas CSS para responsividade e acessibilidade", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  // Tokens de marca agora vivem em @metropolis/ui, compartilhados com o portal.
  const tokens = await readFile(new URL("../../packages/ui/tokens.css", root), "utf8");

  assert.match(tokens, /--font-size-body:\s*1\.0625rem/);
  assert.match(tokens, /--measure-prose:\s*70ch/);
  assert.match(tokens, /--section-compact:/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,/);
  assert.match(css, /flex-wrap:\s*wrap/);
  assert.match(css, /@media\s*\(min-width:\s*68rem\)/);
  assert.match(css, /@media\s*\(min-width:\s*48rem\)/);
  assert.match(css, /min-height:\s*2\.75rem/);
  assert.match(css, /:where\(a, button, summary, input, textarea, select\):focus-visible[\s\S]*outline:\s*3px solid/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /animation-duration:\s*0\.01ms\s*!important/);
  assert.doesNotMatch(css, /letter-spacing:\s*-(?:0\.0[5-9]|0\.[1-9])em/);

  // Estilos de /privacidade preservados na reescrita
  assert.match(css, /\.privacy-layout/);
  assert.match(css, /\.reading-nav/);

  // CSS morto da home anterior removido de fato
  assert.doesNotMatch(css, /\.journey|\.flow-point|\.service-list|\.bio-list/);
});
