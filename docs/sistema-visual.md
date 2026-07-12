# Sistema visual — Metropolis Analytics

## Direção curta

**Cena de uso.** Uma pesquisadora abre o site entre uma reunião e a revisão do protocolo, em uma tela clara, procurando rapidamente se o apoio é rigoroso, compreensível e adequado ao estágio do estudo.

**Voz visual.** Precisa, serena e próxima. A referência não é um prontuário nem um dashboard: é uma folha de métodos bem editada, com hierarquia nítida, espaço para leitura e marcações azuis usadas apenas para orientar ação e raciocínio.

**Paleta.** Azul Metropolis `#0066cc`, marinho `#2c3e50`, tinta `#243746`, branco `#ffffff`, superfície azul-neutra `#f4f8fb` e verde de confirmação `#18734c`. A estratégia é restrita: branco e neutros carregam a leitura; o azul preservado identifica ação, link e foco.

**Tipografia.** Uma única família, Source Sans 3, nos pesos reais 400, 600 e 700. É uma sans humanista legível em texto técnico e não depende de contraste artificial entre famílias. Corpo de 1rem/1.7; títulos fluidos com tracking entre `-0.015em` e `-0.035em`; prosa limitada a `70ch`.

**Layout e ritmo.** Contêiner de até 80rem, gutters fluidos e seções em três cadências (`compacta`, `normal`, `ampla`). Textos longos mantêm medida editorial; listas e relações podem usar linhas e deslocamentos, mas cards só quando forem uma unidade interativa real.

**Assinatura.** “Linha de raciocínio”: regras finas horizontais, pontos/estimativas e intervalos abstratos poderão conectar pergunta, desenho e método. Ela codifica incerteza e percurso científico; não simula resultados e não usa grade cartesiana decorativa.

## Autocrítica antes da implementação

- Rejeitado: estética de prontuário, cruz médica, cyan/verde como atalho para “saúde” e qualquer dashboard de métricas. Isso faria a categoria decidir a identidade.
- Rejeitado: visual editorial de serifas, itálicos, colunas de jornal e microetiquetas em caixa alta. “Clínico-editorial” aqui significa qualidade de edição, não fantasia de revista.
- Rejeitado: recomendação automática de blocos vibrantes, fundo creme, Outfit/Work Sans e animação narrativa. Ela conflita com a serenidade, a identidade existente e os padrões proibidos do plano.
- Risco assumido: a marca será memorável pela disciplina da linha científica e pelo uso comedido de azul, não por ornamentos. Para evitar que “minimal” vire genérico, variação de ritmo, tipografia humanista e relações gráficas baseadas em incerteza devem aparecer nas Tasks 04/05.

## Fundamentos e critérios

- Texto normal precisa de contraste mínimo 4.5:1; elementos gráficos e texto grande, 3:1.
- Foco usa anel azul de 3px com afastamento; hover, active e disabled não dependem só de movimento.
- Alvos interativos têm mínimo de 44px quando o controle tem formato próprio.
- Movimento de interface usa 160–240ms e curva de saída; `prefers-reduced-motion` desliga rolagem suave, animações e transições.
- Não usar: gradiente de texto, glassmorphism, borda lateral de destaque, sombra ampla com borda, pills em excesso, etiquetas repetidas em caixa alta, números decorativos, grades repetitivas de cards ou fundos de grade CSS.
- Esta task define a fundação. A estrutura, o conteúdo e o hero finais permanecem para as Tasks 04/05.
