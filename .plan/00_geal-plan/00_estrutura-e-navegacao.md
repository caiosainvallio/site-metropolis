# Task 04 — Estrutura da homepage e navegação responsiva

## Objetivo

Construir a base semântica e responsiva da nova homepage, mantendo o conteúdo majoritariamente como Server Components e oferecendo navegação clara em desktop e mobile.

## Dependências

- Task 02 — Estratégia de conteúdo e arquitetura.
- Task 03 — Sistema visual.

## Escopo

- Reestruturar `app/page.tsx` com as dez seções planejadas e âncoras estáveis.
- Implementar cabeçalho, navegação desktop, navegação mobile explícita e rodapé.
- Incluir skip link para o conteúdo principal.
- Garantir landmarks e hierarquia semântica de títulos.
- Manter áreas clicáveis com pelo menos 44 × 44px.
- Evitar Client Components fora de interações que realmente os exijam.
- Preparar o layout das bios para aceitar retratos profissionais no futuro, sem mostrar foto ou placeholder agora.

## Entregáveis

- Estrutura completa da homepage.
- Navegação responsiva e acessível.
- Base estrutural das seções e das bios.

## Critérios de aceite

- As dez seções aparecem na ordem definida e podem ser alcançadas pela navegação pertinente.
- O skip link funciona e recebe foco visível.
- Há `header`, `nav`, `main`, seções nomeadas e `footer` usados de forma coerente.
- A navegação mobile não depende de hover e permanece operável com teclado.
- A página não ganha JavaScript de cliente sem necessidade demonstrável.

## Validação final da task

1. Executar `npm run lint`.
2. Renderizar a página e percorrer todos os controles apenas com teclado.
3. Conferir landmarks, ordem de títulos e nomes acessíveis com a árvore de acessibilidade do navegador.
4. Verificar áreas de toque em viewport de 375px e ausência de rolagem horizontal.
5. A task está concluída quando a estrutura funciona sem conteúdo ausente, erros de lint ou barreiras básicas de navegação.

