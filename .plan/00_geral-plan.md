# Refatoração geral — Metropolis Analytics

## Resumo

Transformar o site em um cartão de visita institucional para pesquisadores em saúde, com posicionamento de “rigor acessível”, leitura móvel e conversão para uma conversa pelo WhatsApp. A nova versão será validada em ambiente privado antes de qualquer publicação pública.

As cinco skills instaladas orientarão o trabalho: direção visual (`frontend-design`), diagramação e acabamento (`impeccable`), acessibilidade e UX (`ui-ux-pro-max`), mensagem comercial (`copywriting`) e arquitetura React (`vercel-react-best-practices`). O fluxo de Sites cuidará da validação e da prévia privada.

## Mudanças principais

- Remover integralmente a seção “Trabalhos”, todos os links para RPubs e qualquer CTA de portfólio. Nenhum relatório privado será citado, resumido ou usado como estudo de caso.
- Reestruturar a homepage nesta ordem:
  1. Hero com proposta de valor e CTA “Solicitar conversa”.
  2. Momentos em que a consultoria pode ajudar.
  3. Jornada completa: desenho, planejamento, banco, análise, interpretação e comunicação.
  4. Mapa “pergunta científica → desenho → método”.
  5. Desenhos de estudo atendidos.
  6. Processo de trabalho e entregas.
  7. Confidencialidade e princípios.
  8. Responsáveis.
  9. FAQ.
  10. Contato com escolha entre Caio e Vitor.
- Organizar o mapa técnico por perguntas:
  - frequência e prevalência;
  - comparação entre grupos;
  - associação e efeito;
  - dados longitudinais e repetidos;
  - tempo até evento;
  - diagnóstico e propriedades de medida;
  - predição e machine learning;
  - síntese de evidências e meta-análise;
  - avaliação econômica em saúde;
  - métodos bayesianos como abordagem transversal.
- Apresentar estudos transversais, coortes, caso-controle, ensaios clínicos, estudos diagnósticos, validação de instrumentos, revisões sistemáticas/meta-análises e avaliações econômicas. Não oferecer análise qualitativa.
- Destacar três entregas combinadas: acompanhamento consultivo, relatório reprodutível e tabelas/figuras prontas para publicação.
- Substituir prova por portfólio por princípios verificáveis: decisões documentadas, reprodutibilidade, adequação metodológica, comunicação compreensível e confidencialidade.
- Criar `/privacidade`, cobrindo ausência de formulário próprio, links externos para WhatsApp e perfis profissionais, dados técnicos de hospedagem, confidencialidade de projetos e canal para solicitações sobre privacidade.
- Usar CTAs para `wa.me/5511980158332` e `wa.me/5511957163477`, com a mensagem: “Olá, gostaria de conversar sobre apoio metodológico e estatístico para uma pesquisa em saúde.”
- Exibir perfis públicos nas bios:
  - Caio Sain Vallio: doutor em Fisioterapia, pesquisador e autor/coautor de trabalhos em epidemiologia, modelagem e ciência de dados em saúde; links para [LinkedIn](https://www.linkedin.com/in/caiosainvallio/) e Google Acadêmico.
  - Vitor Sain Vallio: mestre em Ciências da Saúde e cientista de dados com experiência em análise epidemiológica e modelagem estatística; links para [LinkedIn](https://www.linkedin.com/in/vitor-vallio/) e Lattes. As credenciais serão limitadas ao que estiver publicamente verificável na [Santa Casa](https://fcmsantacasasp.edu.br/vemprasanta/mestrado-academico-doutorado-ciencias-da-saude-dissertacoes-de-mestrado/) e nos perfis fornecidos.
- Construir as bios sem fotografias ou placeholders; o layout aceitará retratos profissionais futuramente sem refatoração estrutural.

## Sistema visual e implementação

- Adotar direção “clínico editorial”, preservando logo, azul `#0066cc` e marinho `#2c3e50`, com tons auxiliares refinados e tokens semânticos de superfície, texto, borda, foco e estados.
- Trocar Open Sans por uma sans humanista de alta legibilidade, usando uma única família com variação real de pesos e escala tipográfica fluida. Corpo mínimo de 16px, medida de 65–75 caracteres e tracking do display nunca inferior a `-0.04em`.
- Remover sinais genéricos do layout atual: etiquetas repetidas em caixa alta, numeração decorativa, card de dashboard, barra de credibilidade genérica, borda lateral de destaque e sombra ampla combinada com borda.
- Criar uma figura científica autoral no hero, baseada em estimativas e intervalos de incerteza abstratos, sem simular dados reais. O movimento será sutil, funcional, limitado a transformações/opacity e terá alternativa estática em `prefers-reduced-motion`.
- Usar composição espaçosa, mas informativa: uma ideia principal por seção, variação de ritmo vertical, sem grades repetitivas de cards.
- Manter a homepage majoritariamente como Server Component. Qualquer comportamento da figura será isolado em um pequeno Client Component, carregado sem dependências pesadas.
- Incluir skip link, foco visível, áreas clicáveis de pelo menos 44px, hierarquia semântica de títulos, contraste WCAG AA e navegação mobile explícita.
- Atualizar metadata, sitemap/robots quando aplicável e cartão social sem referências a clientes ou relatórios.
- Corrigir o teste legado que ainda espera o skeleton inicial; adicionar verificações para conteúdo institucional, ausência de URLs privadas, rotas e acessibilidade básica.
- Versionar as cinco skills locais e `skills-lock.json` para tornar o processo de design reproduzível.

## Testes e entrega

- Validar em 375, 768, 1024 e 1440px, incluindo orientação horizontal, zoom de texto e ausência de rolagem lateral.
- Testar teclado, foco, leitores de tela básicos, contraste, `prefers-reduced-motion` e alvos de toque.
- Confirmar que nenhuma ocorrência de `rpubs.com`, nomes de projetos privados ou links de relatórios permaneça no HTML, metadata ou cartão social.
- Verificar os dois links de WhatsApp, os quatro perfis externos e a navegação para `/privacidade`.
- Executar build, lint, teste renderizado e auditoria de performance; evitar JavaScript de cliente desnecessário e mudanças de layout.
- Publicar primeiro uma nova versão privada no mesmo projeto Sites. A mudança para acesso público ficará condicionada à aprovação explícita após revisão do conteúdo, credenciais, política e visual.

## Premissas

- O site continuará em português brasileiro e será uma landing page institucional com uma página adicional de privacidade.
- Não haverá preços, formulário próprio, depoimentos, métricas inventadas ou alegações de resultados garantidos.
- A principal origem de tráfego será indicação e compartilhamento direto.
- LinkedIn, Google Acadêmico e Lattes são permitidos como prova pública; relatórios individuais continuam confidenciais.
- A versão inicial será entregue sem fotografias da equipe.
