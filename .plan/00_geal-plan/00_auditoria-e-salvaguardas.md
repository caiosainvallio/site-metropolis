# Task 01 — Auditoria inicial e salvaguardas de confidencialidade

## Objetivo

Mapear o estado atual do site e criar uma linha de base verificável antes da refatoração, com atenção especial à remoção de portfólio, RPubs, projetos privados e alegações não permitidas.

## Dependências

- Nenhuma.

## Escopo

- Inventariar rotas, componentes, assets, metadata, testes e conteúdo atualmente publicado.
- Localizar todas as ocorrências de `rpubs.com`, “Trabalhos”, CTAs de portfólio, nomes de projetos, relatórios e referências a clientes.
- Registrar os conteúdos que precisam ser removidos sem copiar informações confidenciais para novos documentos.
- Confirmar a stack, os comandos disponíveis e a configuração do projeto Sites.
- Definir uma lista de termos/URLs proibidos que possa ser reutilizada nos testes.
- Confirmar que preços, formulário próprio, depoimentos, métricas inventadas e garantias de resultado não serão introduzidos.

## Entregáveis

- Inventário curto do estado atual e dos pontos de remoção.
- Lista de termos e URLs proibidos para validação automatizada.
- Registro dos comandos válidos de build, lint e teste.

## Critérios de aceite

- Todas as rotas e superfícies públicas atuais foram verificadas.
- Todo conteúdo de portfólio ou potencialmente privado tem um destino claro: remoção, sem migração para estudos de caso.
- A lista de proibições contempla HTML, código-fonte, metadata e cartão social.
- Nenhum dado confidencial foi reproduzido na documentação da auditoria.

## Validação final da task

1. Executar `rg -ni "rpubs|trabalhos|portf[oó]lio|relat[oó]rio|estudo de caso" app public tests` e revisar cada resultado.
2. Executar `rg --files app public tests` e conferir o inventário de rotas, assets e testes.
3. Confirmar em `package.json` a existência dos scripts `build`, `lint` e `test`.
4. A task está concluída quando cada ocorrência encontrada estiver classificada e a lista de proibições estiver pronta para virar teste de regressão.

