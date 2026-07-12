# Auditoria inicial e salvaguardas

Linha de base da Task 01, realizada em 12 de julho de 2026. Este registro não reproduz nomes de projetos, clientes ou identificadores presentes em URLs privadas.

## Inventário público

- Rotas: apenas `/`, implementada por `app/page.tsx`; não há `robots`, `sitemap` ou outras páginas no App Router.
- Estrutura: layout raiz e metadata em `app/layout.tsx`; estilos globais em `app/globals.css`; a homepage é um Server Component.
- Assets públicos: uma marca em PNG, um cartão social em PNG e quatro SVGs genéricos. O cartão social foi inspecionado visualmente e não contém clientes, relatórios ou projetos.
- Metadata: título, descrição, ícones, Open Graph e Twitter usam a marca e o cartão social. Não há referência privada na metadata textual.
- Testes: um teste de HTML renderizado. Ele ainda exige o skeleton inicial e arquivos já ausentes, portanto não representa a homepage atual.
- Stack: Node 22+, React 19, Next 16 sobre Vinext/Vite, Tailwind/PostCSS, Cloudflare Workers/Wrangler e ESLint 9. Drizzle está instalado, mas o Sites não declara D1 ou R2.
- Sites: `.openai/hosting.json` existe e identifica o projeto; `vite.config.ts` mantém o plugin `sites()` e a saída compatível com Worker. Nenhuma publicação foi realizada nesta auditoria.

## Pontos de remoção

Todas as ocorrências abaixo estão em `app/page.tsx` e têm como destino **remoção integral**, sem migração para estudos de caso:

| Superfície | Localizações | Classificação | Destino |
| --- | --- | --- | --- |
| Navegação e CTAs internos de trabalhos | linhas 14, 16 e 28 | Portfólio | Remover ou substituir por contato institucional |
| Links externos com identificadores potencialmente privados | linhas 83, 97, 119, 120 e 128 | RPubs/portfólio; 5 ocorrências, 3 destinos distintos | Remover integralmente |
| Seção de trabalhos | linhas 112–121 | Portfólio e referências a relatórios | Remover a seção inteira |
| Texto de fechamento e CTA de portfólio | linhas 127–128 | Portfólio | Substituir por conversa via canal externo permitido |
| Menção a relatório na oferta | linha 94 | Entregável genérico permitido | Manter somente como “relatório reprodutível”, sem exemplo ou identificação |

Não foram encontradas referências explícitas a clientes. A figura atual usa um rótulo abstrato de projeto, sem nome ou dado real. A busca de linha de base encontrou 13 linhas para os termos obrigatórios; todas estão classificadas acima.

## Política de conteúdo

`config/forbidden-content.json` é a fonte reutilizável para regressão em código-fonte, HTML renderizado, metadata e texto associado ao cartão social. Domínios de publicação, linguagem de portfólio e estudos de caso são bloqueados. Menções genéricas a relatórios e clientes exigem revisão porque podem ser legítimas apenas sem identificação.

Também ficam vedados preços, formulário próprio, depoimentos, métricas inventadas e garantias de resultado. Esses itens estão registrados como restrições explícitas no arquivo de política, sem afirmar ou reproduzir dados dessa natureza.

## Comandos válidos

- Build: `npm run build`
- Lint: `npm run lint`
- Teste renderizado: `npm test` (executa o build antes de `node --test tests/rendered-html.test.mjs`)

## Resultado da validação

- `npm run build`: aprovado; a única rota detectada foi `/` (classificação estática ainda indicada como desconhecida pelo Vinext).
- `npm run lint`: aprovado sem erros e com 137 avisos. Dois pertencem à homepage (uso de `<img>`); os demais estão nas skills locais já existentes.
- `npm test`: build aprovado e 2 testes falharam, ambos por ainda exigirem o skeleton inicial e seus arquivos ausentes.

Esta linha de base confirma o débito do teste legado. A Task 01 não altera conteúdo público, rotas ou testes.
