# Checklist de aprovação — prévia privada

Atualizado em 12 de julho de 2026 para a Task 10.

## Estado da entrega

- [x] O projeto Sites configurado em `.openai/hosting.json` foi identificado e preservado.
- [x] Nenhum controle de acesso foi alterado.
- [x] Nenhuma publicação pública, servidor local ou porta foi iniciada nesta task.
- [ ] URL privada disponível para revisão.

**Bloqueio:** o projeto configurado está atualmente em modo de acesso público. Por isso, a operação de implantação estritamente privada não pode ser executada com segurança. O fallback de implantação compartilhada/pública não foi usado. A URL privada permanece indisponível até que exista um projeto ou uma política já configurada como owner-only, sem que esta task altere os controles de acesso.

## Conteúdo

- [x] Proposta institucional, escopo e entregas cobertos por testes do HTML renderizado.
- [x] Homepage e `/privacidade` cobertas por testes automatizados.
- [x] Padrões bloqueados por `config/forbidden-content.json` verificados pela suíte.
- [ ] Aprovação editorial final da homepage pelos responsáveis.
- [ ] Confirmação de que nomes, credenciais profissionais, números de WhatsApp e destinos externos permanecem atuais.

## Credenciais e confidencialidade

- [x] Nenhuma credencial de hospedagem foi escrita em arquivos versionados.
- [x] Arquivos `.env*`, chaves, certificados, logs e arquivos compactados foram procurados fora de dependências e saídas ignoradas; nenhum candidato foi encontrado.
- [x] Dados privados e relatórios não fazem parte do conteúdo público revisado.
- [x] Artefatos gerados (`dist`, `.vinext`, `.wrangler`) permanecem ignorados pelo Git.
- [ ] Revalidação dos links externos e WhatsApp na futura URL privada.

## Política e conformidade

- [x] A rota `/privacidade` existe e declara ausência de formulário próprio, uso de serviços externos, dados técnicos de hospedagem, confidencialidade e canal de solicitação.
- [x] Links externos abrem com proteção `noopener noreferrer` onde aplicável.
- [ ] Aprovação jurídica/editorial final da Política de Privacidade.

## Visual, acessibilidade e navegação

- [x] Sem achados críticos ou altos na inspeção estática registrada em `docs/qa-tecnico.md`.
- [ ] Smoke test da URL privada em desktop: `/`, `/privacidade`, navegação, links externos e WhatsApp.
- [ ] Smoke test da URL privada em mobile: `/`, `/privacidade`, navegação, links externos e WhatsApp.
- [ ] Validação visual final, reflow/zoom, teclado, leitor de tela, contraste computado e Lighthouse em browser autorizado.

## Reprodutibilidade

- [x] As cinco skills locais estão presentes em `.agents/skills`: `frontend-design`, `impeccable`, `ui-ux-pro-max`, `copywriting` e `vercel-react-best-practices`.
- [x] `skills-lock.json` contém fonte, caminho de origem e hash SHA-256 correspondente ao `SKILL.md` local de cada skill.
- [ ] As cinco skills, o lockfile e os demais arquivos da entrega precisam ser incluídos no próximo commit seguro do fluxo de publicação privada.

## URL privada e decisão pendente

- **URL privada:** indisponível — implantação privada bloqueada pela política de acesso atual do projeto.
- **Acesso público existente:** preservado, sem nova versão implantada nesta task.
- **Decisão necessária:** disponibilizar um destino Sites já configurado como owner-only, ou autorizar explicitamente em uma task futura a alteração apropriada de acesso. Esta task não faz essa alteração.
