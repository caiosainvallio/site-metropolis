# Task 03 — Sistema visual clínico-editorial

## Objetivo

Definir e implementar uma direção visual “clínico editorial” distinta, legível e coerente, preservando a identidade existente sem repetir padrões genéricos do layout atual.

## Dependências

- Task 02 — Estratégia de conteúdo e arquitetura da informação.

## Escopo

- Preservar o logo, o azul `#0066cc` e o marinho `#2c3e50`.
- Criar tokens semânticos para superfície, texto, borda, foco, estados e cores auxiliares.
- Substituir Open Sans por uma única sans humanista com pesos reais e carregamento eficiente.
- Definir escala tipográfica fluida, corpo mínimo de 16px, medida de 65–75 caracteres e tracking de display nunca inferior a `-0.04em`.
- Planejar ritmo vertical variado e composição espaçosa, sem transformar todas as seções em grades repetitivas de cards.
- Remover etiquetas repetidas em caixa alta, numeração decorativa, card de dashboard, barra genérica de credibilidade, borda lateral de destaque e combinação de sombra ampla com borda.
- Definir estados de interação, foco e redução de movimento.

## Entregáveis

- Tokens e estilos globais implementados em `app/globals.css` ou estrutura equivalente.
- Regras tipográficas, de espaçamento, contêiner e responsividade.
- Vocabulário visual para seções, links, botões e superfícies.

## Critérios de aceite

- A identidade é reconhecível sem depender de componentes decorativos genéricos.
- Texto corrido mantém legibilidade e medida adequada nos breakpoints principais.
- Cores de texto, controles e foco atingem WCAG AA.
- Estados hover, focus-visible, active e disabled são distinguíveis quando aplicáveis.
- Não há repetição sistemática do mesmo card ou do mesmo ritmo em todas as seções.

## Validação final da task

1. Inspecionar visualmente 375, 768, 1024 e 1440px.
2. Medir contraste dos pares principais e confirmar WCAG AA.
3. Confirmar no CSS `font-size` base mínimo de 16px, limite de medida e `letter-spacing >= -0.04em` nos displays.
4. Navegar por teclado e verificar foco visível em todos os elementos interativos.
5. A task está concluída quando os tokens sustentam todas as telas sem estilos pontuais conflitantes e o visual atende aos critérios acima.

