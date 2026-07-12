# Task 10 — Reprodutibilidade e prévia privada

## Objetivo

Consolidar a entrega reproduzível e publicar uma nova versão privada no mesmo projeto Sites para revisão, sem alterar o acesso público antes de aprovação explícita.

## Dependências

- Task 09 — Testes, acessibilidade, responsividade e performance.

## Escopo

- Confirmar que as cinco skills locais usadas no processo estão versionadas: `frontend-design`, `impeccable`, `ui-ux-pro-max`, `copywriting` e `vercel-react-best-practices`.
- Atualizar e validar `skills-lock.json` para refletir as versões utilizadas.
- Revisar o diff final e excluir artefatos locais, temporários ou confidenciais.
- Gerar uma nova versão privada no mesmo projeto configurado em `.openai/hosting.json`.
- Realizar smoke test da URL privada em desktop e mobile.
- Preparar checklist de aprovação de conteúdo, credenciais, política e visual.
- Não tornar a versão pública e não alterar controles de acesso sem aprovação explícita posterior.

## Entregáveis

- Skills e lockfile reproduzíveis no repositório.
- Build validada e versão privada disponível para revisão.
- Checklist final de aprovação com URL da prévia e pendências, se houver.

## Critérios de aceite

- Outra pessoa consegue identificar as cinco skills e suas versões a partir do repositório.
- O diff não contém segredos, relatórios, dados privados nem artefatos de desenvolvimento.
- A prévia privada usa o mesmo projeto Sites e carrega `/` e `/privacidade` corretamente.
- Links externos e WhatsApp funcionam na prévia.
- O acesso público permanece inalterado.

## Validação final da task

1. Executar novamente `npm run lint`, `npm run build` e `npm test` no estado exato a ser publicado.
2. Conferir `git diff --check`, `git status --short` e revisar todo o diff.
3. Validar as cinco entradas de skills e `skills-lock.json`.
4. Abrir a prévia privada em mobile e desktop e testar `/`, `/privacidade`, navegação e links externos.
5. Registrar aprovação pendente para conteúdo, credenciais, política e visual.
6. A task está concluída quando a prévia privada está validada e compartilhável para revisão; publicação pública permanece uma task futura condicionada à autorização explícita.

