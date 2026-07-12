# Task 09 — Testes, acessibilidade, responsividade e performance

## Objetivo

Transformar os critérios do plano em regressões automatizadas e concluir a validação técnica e visual da nova experiência.

## Dependências

- Tasks 04 a 08 concluídas.

## Escopo

- Corrigir o teste legado que espera o skeleton inicial.
- Adicionar verificações de conteúdo institucional, ordem/rotas essenciais e ausência de URLs ou termos privados.
- Testar os dois links de WhatsApp, os quatro perfis externos e `/privacidade`.
- Adicionar verificações básicas de landmarks, título principal, skip link e nomes acessíveis.
- Validar 375, 768, 1024 e 1440px, orientação horizontal, zoom de texto e ausência de rolagem lateral.
- Testar teclado, foco, leitor de tela básico, contraste, alvos de toque e `prefers-reduced-motion`.
- Executar build, lint, teste renderizado e auditoria de performance.
- Verificar JavaScript de cliente, mudança de layout e assets desnecessários.

## Entregáveis

- Suite de testes renderizados atualizada.
- Checklist de QA responsivo e acessível preenchido.
- Resultado da auditoria de performance com problemas críticos corrigidos.

## Critérios de aceite

- `npm run lint`, `npm run build` e `npm test` terminam com sucesso.
- Nenhuma URL RPubs, nome privado ou link de relatório aparece na saída renderizada.
- Não há rolagem horizontal nos tamanhos e modos exigidos.
- Todo fluxo principal funciona com teclado, foco visível e alvos de pelo menos 44px.
- A redução de movimento funciona e a auditoria não aponta regressões críticas de acessibilidade, performance ou layout shift.

## Validação final da task

1. Executar `npm run lint`.
2. Executar `npm run build`.
3. Executar `npm test`.
4. Rodar a busca de conteúdo proibido sobre código e saída de build.
5. Preencher a matriz manual em 375, 768, 1024 e 1440px, incluindo landscape e zoom de texto.
6. Executar auditoria de performance e acessibilidade na build de produção.
7. A task está concluída somente quando todos os comandos passam e não restam achados críticos ou altos sem resolução documentada.

