# QA técnico — Task 09

Validação realizada em 12 de julho de 2026, sem iniciar servidor, abrir porta ou usar browser. A distinção entre evidência automatizada, inspeção estática e validação pendente é deliberada: CSS responsivo não comprova sozinho geometria real, ordem de foco ou comportamento de tecnologia assistiva.

## Resultado executivo

- HTML renderizado da build: automatizado para `/` e `/privacidade`.
- Conteúdo, ordem das dez seções, rotas, links e semântica básica: automatizados.
- Responsividade, overflow, zoom, teclado e leitor de tela: inspecionados estaticamente; validação operacional em browser não executada por restrição da task.
- Performance: build e arquitetura inspecionadas; Lighthouse, Core Web Vitals e layout shift visual não medidos sem browser.
- Achados críticos/altos na inspeção estática: nenhum aberto.

## Matriz responsiva

| Cenário | Evidência estática | Estado | Limite da validação |
| --- | --- | --- | --- |
| 375 px retrato | Breakpoint de 48rem empilha hero, listas, bios, contato, conteúdo de privacidade e rodapé; gutter fluido; grids usam `minmax(0, …)` | Aprovado estaticamente | Overflow real e recorte de texto pendentes em browser |
| 768 px retrato | Regras de 48rem se aplicam no limite e eliminam colunas estreitas | Aprovado estaticamente | Captura visual pendente |
| 1024 px retrato | Navegação móvel ativa abaixo de 68rem; hero já está em uma coluna | Aprovado estaticamente | Operação do `<details>` e geometria pendentes |
| 1440 px | Contêiner limitado a 80rem, gutters fluidos e colunas com mínimo zero | Aprovado estaticamente | Distribuição visual e CLS pendentes |
| Landscape estreito | Layout depende da largura, não da orientação; breakpoint móvel permanece disponível | Aprovado estaticamente | Altura útil, menu aberto e dobra pendentes |
| Zoom de texto (200%) | Unidades `rem`, `clamp`, `flex-wrap`, colunas empilhadas e ausência de alturas fixas no conteúdo textual reduzem risco | Aprovado estaticamente | Reflow WCAG 1.4.10 precisa de browser com zoom real |
| Rolagem horizontal | Conteúdo usa `max-width: 100%`, `minmax(0, …)`, wrap e menu limitado ao viewport | Sem causa crítica encontrada | `scrollWidth` não foi medido; não marcado como teste visual concluído |

Os breakpoints cobrem explicitamente as larguras pedidas: 375 e 768 px pelo modo compacto, 1024 px pelo modo de navegação/hero móvel e 1440 px pelo contêiner desktop. Não há media query de orientação porque a composição responde à largura disponível.

## Matriz de acessibilidade

| Critério | Como foi verificado | Estado |
| --- | --- | --- |
| Landmarks e idioma | Teste do HTML exige `lang="pt-BR"`, um `header`, um `main` e um `footer` | Automatizado |
| Hierarquia principal | Teste exige exatamente um `h1` em cada rota | Automatizado |
| Skip link | Teste exige destino `#conteudo`; CSS fornece foco visível e deslocamento para a tela | Automatizado + estático |
| Nomes acessíveis | Navegações rotuladas; marca, perfis, buscas e WhatsApps identificam destino/pessoa; imagens têm `alt` | Automatizado |
| Nova aba | Quatro perfis e dois contatos usam `target="_blank"`, `rel="noopener noreferrer"` e aviso para leitor de tela | Automatizado |
| Teclado e foco | Links e `summary` são controles nativos; `:focus-visible` tem outline de 3px e offset | Inspeção estática; percurso real pendente |
| Alvos de toque | Navegação, botões, marca, perfis, rodapé, menu e skip link declaram mínimo de 2.75rem (44px na base de 16px) | Automatizado + estático |
| Movimento reduzido | Media query remove animações da figura e reduz transições; scroll suave é desativado | Automatizado + estático |
| Leitor de tela | Semântica, rótulos e textos auxiliares inspecionados no HTML | Árvore/fala real pendente sem browser/AT |
| Contraste | Pares principais foram comparados pelos tokens: texto e texto secundário sobre branco/superfície clara, branco sobre azul e foco azul sobre superfícies claras | Inspeção estática; auditoria computada em browser pendente |

## Conteúdo e rotas automatizados

A suíte `tests/rendered-html.test.mjs` cobre:

- proposta institucional, fronteira de escopo e três entregas;
- ordem das dez seções da homepage;
- padrões bloqueados carregados de `config/forbidden-content.json` e caminhos de relatório; nomes privados não são reproduzidos na configuração, portanto a regressão nominal depende da lista versionada ser ampliada se um identificador concreto for descoberto;
- dois WhatsApps, números exatos, mensagem pré-preenchida e pessoa no nome acessível;
- quatro destinos profissionais, `target`/`rel` e rótulos explícitos das buscas públicas de Google Acadêmico e Lattes;
- links internos e os cinco tópicos obrigatórios de `/privacidade`;
- landmarks, idioma, `h1`, skip link, navegações e textos alternativos;
- salvaguardas CSS de reflow, foco, alvo de toque e movimento reduzido.

## Performance e estabilidade

| Verificação | Resultado |
| --- | --- |
| JavaScript de cliente próprio | Nenhum `"use client"` nos componentes das duas páginas; conteúdo e figura são renderizados no servidor |
| Dependências de animação | Nenhuma; figura usa apenas CSS com `transform` e `opacity` |
| Assets principais | Logo tem dimensões explícitas; hero é CSS e não requisita imagem; fonte usa `next/font` com três pesos e `display: swap` |
| Layout shift | Dimensões de imagens e mínimos da figura reservam espaço; nenhuma causa crítica encontrada estaticamente |
| Assets genéricos | `public/file.svg`, `globe.svg` e `window.svg` não são referenciados pela aplicação; são candidatos seguros a limpeza futura, sem impacto no bundle renderizado |
| Auditoria Lighthouse/Core Web Vitals | Não executada: exige browser ou processo servido, ambos fora do escopo autorizado desta task |

## Pendências manuais antes de afirmar conformidade completa

Em uma etapa com browser autorizado, executar: capturas em 375/768/1024/1440 px e landscape; medir `scrollWidth`; zoom de texto a 200%; percurso completo por Tab/Shift+Tab com menu aberto; inspeção da árvore e leitura básica por tecnologia assistiva; contraste computado; Lighthouse de produção; CLS e carregamento de fontes/assets. Essas pendências não representam achado crítico conhecido, mas impedem declarar que os critérios exclusivamente visuais/operacionais foram comprovados.
