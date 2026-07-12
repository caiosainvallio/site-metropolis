import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const forbiddenPolicy = JSON.parse(
  await readFile(new URL("config/forbidden-content.json", root), "utf8"),
);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
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

test("renderiza a homepage institucional completa na ordem planejada", async () => {
  const html = await renderedHtml();

  assert.match(html, /<title>Apoio metodológico e estatístico para pesquisas em saúde \| Metropolis Analytics<\/title>/i);
  assert.match(html, /Da pergunta científica à comunicação dos achados/i);
  assert.match(html, /Não oferecemos análise qualitativa/i);
  assert.match(html, /Acompanhamento consultivo/i);
  assert.match(html, /Relatório reprodutível/i);
  assert.match(html, /Tabelas e figuras prontas para publicação/i);

  assertInOrder(html, [
    'id="inicio"',
    'id="quando-ajudamos"',
    'id="jornada"',
    'id="mapa-metodologico"',
    'id="desenhos"',
    'id="processo"',
    'id="principios"',
    'id="responsaveis"',
    'id="faq"',
    'id="contato"',
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
  assert.match(html, /<a[^>]+class="skip-link"[^>]+href="#conteudo"[^>]*>Pular para o conteúdo principal<\/a>/i);
  assert.match(html, /<main[^>]+id="conteudo"/i);
  assert.match(html, /<nav[^>]+aria-label="Navegação principal"/i);
  assert.match(html, /<nav[^>]+aria-label="Navegação principal para dispositivos móveis"/i);
  assert.match(html, /<summary>Menu\s*<span[^>]+aria-hidden="true"/i);
  assert.match(html, /aria-label="Metropolis Analytics — início"/i);
  assert.doesNotMatch(html, /<img(?![^>]*\balt=)[^>]*>/i);
});

test("expõe dois contatos de WhatsApp com número, mensagem e pessoa corretos", async () => {
  const html = await renderedHtml();
  const message = encodeURIComponent(
    "Olá, gostaria de conversar sobre apoio metodológico e estatístico para uma pesquisa em saúde.",
  );

  for (const [number, person] of [
    ["5511980158332", "Caio Sain Vallio"],
    ["5511957163477", "Vitor Sain Vallio"],
  ]) {
    assert.match(html, new RegExp(`href="https://wa\\.me/${number}\\?text=${message}"`, "i"));
    assert.match(html, new RegExp(`com ${person} no WhatsApp \\(abre em nova aba\\)`, "i"));
  }
  assert.equal(count(html, /href="https:\/\/wa\.me\/\d+\?text=/gi), 2);
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
  assert.match(html, /Buscar Currículo Lattes[\s\S]*busca pública restrita ao Lattes, abre em nova aba/i);
  assert.equal(count(html, /class="profile-links"/gi), 2);
});

test("renderiza /privacidade e mantém navegação interna para a política", async () => {
  const [home, privacy] = await Promise.all([renderedHtml(), renderedHtml("/privacidade")]);

  assert.match(home, /href="\/privacidade"[^>]*>Política de Privacidade<\/a>/i);
  assert.match(home, /href="\/privacidade"[^>]*>Privacidade<\/a>/i);
  assert.match(privacy, /<title>Política de Privacidade \| Metropolis Analytics<\/title>/i);
  assert.equal(count(privacy, /<h1\b/gi), 1);
  assert.match(privacy, /Sem formulário próprio/i);
  assert.match(privacy, /Links e serviços de terceiros/i);
  assert.match(privacy, /Dados técnicos de hospedagem/i);
  assert.match(privacy, /confidencialidade dos projetos/i);
  assert.match(privacy, /Solicitações sobre privacidade/i);
  assert.match(privacy, /class="skip-link"[^>]+href="#conteudo"/i);
});

test("declara salvaguardas CSS para responsividade e acessibilidade", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");

  assert.match(css, /--font-size-body:\s*1rem/);
  assert.match(css, /--measure-prose:\s*70ch/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,/);
  assert.match(css, /flex-wrap:\s*wrap/);
  assert.match(css, /@media\s*\(max-width:\s*68rem\)/);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)/);
  assert.match(css, /min-height:\s*2\.75rem/);
  assert.match(css, /:where\(a, summary\):focus-visible[\s\S]*outline:\s*3px solid/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /animation:\s*none/);
  assert.doesNotMatch(css, /letter-spacing:\s*-(?:0\.0[5-9]|0\.[1-9])em/);
});
