# Plano de plataforma — do cartão de visita à área do cliente

Documento para aprovação. Estruturado em etapas independentes, cada uma com argumentos a favor e contra.
Nada aqui foi implementado. Escrito em 18 de julho de 2026.

---

## 1. Onde estamos hoje

Leitura do que existe no repositório, não do que se pretendia:

| Camada | Estado atual |
|---|---|
| Aplicação | Landing única, ~750 linhas em `app/`. Server Components, um Client Component isolado (`site-ui.tsx`) |
| Framework | Next.js 16 App Router, servido por **vinext 0.0.50** sobre Vite |
| Runtime | Cloudflare Workers (`worker/index.ts`) |
| Hospedagem | OpenAI Sites — `.openai/hosting.json`, domínio `*.chatgpt.site` |
| Banco / arquivos | Nenhum. Bindings `D1` e `R2` estão tipados no worker mas `null` na config |
| Autenticação | `app/chatgpt-auth.ts` existe e **não é usado** por nenhuma rota |
| Testes | Um arquivo, mas denso: conteúdo, ordem das seções, a11y, política de conteúdo bloqueado |
| CI | Nenhum. `npm test` só roda local |
| Segredos | Nenhum versionado. Confirmado por auditoria anterior |

**O que está bom e deve ser preservado:** a suíte de testes é acima da média para um site institucional — ela trava regressão de conteúdo, acessibilidade e vazamento de material privado. `config/forbidden-content.json` é um controle real, não decorativo. A separação server/client está correta. A base de documentação em `docs/` é séria.

**O que impede o próximo passo:** três coisas, e nenhuma é de código.

### 1.1 O adapter é pré-1.0

`vinext` está em `0.0.50`. Ele traduz Next.js para o runtime de Workers. Hoje isso serve HTML estático — se estiver errado, a página quebra e alguém vê. Quando houver sessão autenticada, upload de relatório e controle de acesso por cliente, o mesmo adapter passa a mediar **decisões de segurança**. Um bug de roteamento em versão 0.0.x deixa de ser um layout torto e passa a ser um cliente vendo o relatório de outro.

Isso não significa que vinext seja ruim. Significa que ele é uma escolha adequada para o site atual e uma escolha que precisa ser reavaliada conscientemente antes de virar base de um sistema autenticado.

### 1.2 A hospedagem atual não foi feita para isso

OpenAI Sites é excelente para publicar uma landing. Para um portal com clientes reais, faltam respostas que precisam existir **antes** do código:

- Quem é o operador dos dados e existe contrato/DPA que suporte dado de pesquisa em saúde?
- Domínio próprio (`metropolisanalytics.com.br`) em vez de subdomínio de plataforma?
- Política de backup, retenção e exportação — se a plataforma mudar de escopo, os dados dos clientes saem de lá?

Enquanto essas três não tiverem resposta, construir portal em cima é assumir risco que não é técnico, é contratual.

### 1.3 A autenticação existente não serve ao público-alvo

`chatgpt-auth.ts` autentica via headers `oai-authenticated-user-*` — ou seja, exige que o usuário tenha conta ChatGPT e passe pelo login da plataforma. O cliente-alvo é um doutorando, um hospital, uma empresa. Exigir conta ChatGPT para acessar o próprio relatório é uma barreira comercial que não se justifica.

**Recomendação:** remover esse arquivo quando a decisão de auth for tomada, para não virar caminho de código morto que alguém liga por engano.

### 1.4 O ponto que muda a natureza do projeto

Relatórios de pesquisa clínica são, no pior caso, **dado pessoal sensível** (LGPD art. 5º, II e art. 11). Mesmo relatório agregado costuma vir acompanhado do banco que o originou, e bancos de mestrado/doutorado em saúde frequentemente chegam pseudonimizados na melhor das hipóteses — e identificáveis na pior.

No momento em que existe upload, o projeto deixa de ser "um site" e passa a ser "um sistema que trata dado sensível". Isso traz obrigações que não são opcionais: base legal definida, medidas técnicas de proteção, controle de acesso por perfil, registro de auditoria, política de retenção e eliminação, e plano de resposta a incidente. As fontes consultadas convergem: anonimização quando possível, pseudonimização e consentimento/aprovação de CEP quando não, criptografia, acesso por necessidade e testes regulares.

Isso **não** inviabiliza o projeto. Mas define que a Etapa 5 (arquivos) é a mais cara do plano, e que decisões tomadas nas Etapas 1–2 determinam se ela será viável ou dolorosa.

---

## 2. A decisão central: um site ou dois

Antes das etapas, o fork que condiciona todo o resto.

**Proposta: separar o site público do portal em duas aplicações, desde já.**

Site público = marketing, estático, indexável, cacheado na borda, sem estado, sem segredo.
Portal = autenticado, com banco, com arquivos, com auditoria, `noindex`, superfície de ataque real.

### A favor

- **Superfície de ataque contida.** Uma vulnerabilidade no portal não expõe a landing e vice-versa. Hoje qualquer dependência nova entra no mesmo bundle que serve a página pública.
- **Performance da landing preservada.** O site é comercial — ele existe para converter. Ele não deve carregar SDK de auth, cliente de banco nem lógica de sessão.
- **Cadências diferentes.** A landing muda por decisão editorial, raramente. O portal muda por funcionalidade, continuamente. Junto, todo deploy de feature arrisca o material de vendas — que hoje é protegido por testes de conteúdo que passariam a rodar em cada mudança de backend.
- **Reversibilidade.** Se a plataforma do portal se mostrar errada em seis meses, migra-se o portal sem tocar no site que está funcionando e indexado.
- **Conformidade delimitada.** O escopo de LGPD fica no portal. Auditar um sistema é mais barato que auditar dois acoplados.

### Contra

- **Mais infraestrutura.** Dois deploys, dois domínios (`site` + `app.` ou `/portal`), possivelmente duas contas de hospedagem.
- **Duplicação visual.** Header, tokens, tipografia e logo passam a existir em dois lugares — a menos que se extraia um pacote compartilhado, o que é trabalho adicional.
- **Overhead prematuro.** Para uma equipe de duas pessoas e zero clientes no portal, monorepo pode ser cerimônia antes de necessidade.
- **Navegação entre os dois** exige cuidado para não parecer dois produtos distintos.

### Alternativa considerada e descartada

Manter tudo em uma aplicação e proteger `/portal/*` por middleware. É mais simples de começar e é o caminho que a maioria dos projetos toma. Foi descartado como recomendação porque a natureza do dado tratado é sensível: quando o custo de um vazamento é a confidencialidade de pesquisa de terceiros, contenção vale mais que conveniência. **Se o volume de clientes previsto para os primeiros 12 meses for baixo (< 20) e nenhum dado identificável for aceito, essa alternativa volta a ser defensável** — e reduz o plano em cerca de uma etapa inteira.

---

## 3. Etapas

Cada etapa é entregável, testável e aprovável isoladamente. A ordem importa: as três primeiras são pré-requisito das demais.

### Etapa 0 — Fundação e higiene

Sem mudança de arquitetura. Torna o que já existe defensável.

- CI no GitHub Actions rodando `npm run lint` e `npm test` em cada push. Hoje a suíte de conteúdo só protege quem lembra de rodá-la.
- `SECURITY.md` e política de dependências (Dependabot ou Renovate). Next.js teve 13 CVEs corrigidas em maio de 2026, três delas permitindo bypass de autenticação — atualizar deixará de ser opcional quando houver login.
- Cabeçalhos de segurança no worker: CSP, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. Baratos agora, retrabalho depois.
- Remover `app/chatgpt-auth.ts` (código morto que toca autenticação).
- Registrar variáveis de ambiente esperadas em `.env.example`, com `.env*` já ignorado.

**A favor:** baixo custo, sem risco, melhora o site atual independentemente do portal acontecer.
**Contra:** não entrega nada visível ao cliente; é fácil despriorizar.

---

### Etapa 1 — Decisões de plataforma

Etapa de decisão, não de código. Produz um ADR (registro de decisão arquitetural) em `docs/`.

Quatro escolhas a fechar:

**1. Hospedagem do portal.**

| Opção | A favor | Contra |
|---|---|---|
| Cloudflare (conta própria) + D1 + R2 | Continuidade com o worker atual; custo baixo; R2 sem taxa de egresso; controle total da conta | D1 ainda é jovem para carga transacional; menos material de referência; mais coisa montada à mão |
| Vercel + Postgres gerenciado + storage | Caminho mais trilhado do Next.js; Next é produto da própria Vercel; menos atrito com o framework | Custo cresce rápido; egresso cobrado; sai do runtime Workers e obriga rever o worker |
| Supabase (Postgres + Auth + Storage) | Resolve banco, auth, storage e RLS de uma vez; Postgres maduro; RLS é um controle de acesso real no banco | Acoplamento forte a um fornecedor; região dos dados precisa ser verificada; ainda precisa de host para o Next |

*Recomendação: Cloudflare em conta própria para hospedagem + Supabase para banco/auth/storage.* Mantém o runtime já conhecido e traz Postgres com RLS, que é a defesa mais eficaz contra o erro clássico de portal — um cliente lendo dado de outro por falha de query.

**2. Permanecer em vinext ou migrar.** Ver 1.1. A alternativa é Next.js em runtime Node gerenciado. Migrar cedo é barato — o app tem 750 linhas. Migrar depois de o portal existir, não.

**3. Domínio próprio.** Pré-requisito de credibilidade comercial e de qualquer política de cookies/sessão séria. Cookie de sessão em subdomínio de plataforma compartilhada é má ideia.

**4. Base legal LGPD e papel na cadeia.** A Metropolis é controladora ou operadora dos dados que o cliente sobe? A resposta muda contrato, política de privacidade e obrigações. Provavelmente **operadora** — mas isso precisa ser afirmado por escrito, não presumido. Recomenda-se validação jurídica antes da Etapa 5.

**A favor de fazer esta etapa antes de codar:** cada uma dessas decisões é cara de reverter depois. Todas são baratas agora.
**Contra:** é a etapa que menos parece progresso e a que mais atrasa a sensação de andamento.

---

### Etapa 2 — Reorganização estrutural

Monorepo com workspaces npm:

```
apps/site       landing atual, praticamente intacta
apps/portal     aplicação nova, autenticada
packages/ui     tokens, tipografia, logo, componentes compartilhados
packages/config  eslint, tsconfig, tailwind
```

A landing move-se para `apps/site` sem reescrita. A suíte de testes atual acompanha e continua sendo o contrato do conteúdo público.

**A favor:** isolamento real com uma única árvore de código e um único fluxo de PR; o design system deixa de ser copiar e colar.
**Contra:** build mais complexo; `npm test` precisa ser reescrito para rodar por workspace; ganho é invisível enquanto o portal não existir.

---

### Etapa 3 — Autenticação e identidade

Fundamento do portal. Requisitos de segurança que valem independentemente da ferramenta escolhida:

- Verificação de identidade em **três camadas**: middleware/proxy na borda apenas para redirecionamento; verificação real em **cada** Server Action e Route Handler; e autorização final na camada de acesso a dados. Middleware sozinho nunca é controle de acesso — é o erro mais comum e mais explorado em App Router.
- Sessão em cookie `HttpOnly`, `Secure`, `SameSite=Lax`, com rotação e expiração curta.
- E-mail + senha com hash forte, ou magic link. **Passkeys (WebAuthn)** merecem consideração: resistem a phishing por vínculo criptográfico ao domínio e têm suporte nativo em todas as plataformas relevantes em 2026.
- MFA obrigatório para contas internas (Caio e Vitor) desde o primeiro dia. Contas administrativas veem todos os clientes.
- Papéis desde o início: `admin` (equipe) e `client` (cliente), com clientes vinculados a um `project`. Retrofit de modelo de permissão é das refatorações mais dolorosas que existem.

**A favor de terceirizar (Supabase Auth / Clerk / WorkOS):** autenticação é uma superfície onde erro artesanal custa caro; ganha-se MFA, recuperação de senha, rate limiting e log prontos.
**Contra:** custo por usuário ativo; dependência de fornecedor no caminho crítico do login; menos controle sobre o fluxo.

**A favor de implementar com Auth.js:** sem custo por usuário, controle total.
**Contra:** todo detalhe de segurança passa a ser responsabilidade da equipe, permanentemente.

*Recomendação: terceirizar.* Duas pessoas cujo trabalho é estatística não devem manter infraestrutura de autenticação.

---

### Etapa 4 — Modelo de dados e camada de acesso

Modelo mínimo: `organizations`, `users`, `projects`, `project_members`, `documents`, `meetings`, `threads`, `messages`, `audit_log`.

Princípios:

- **Toda** query de dado de cliente filtra por projeto na camada de dados, nunca só na UI. Com Postgres, isso vira RLS — o banco recusa a leitura mesmo se a aplicação errar.
- Camada de acesso a dados única (`packages/db` ou `apps/portal/lib/data`). Nenhum componente monta query direto.
- `audit_log` desde a primeira migração: quem, o quê, quando, de onde. É exigência prática de LGPD e é a única forma de responder "esse arquivo foi acessado por quem?" quando alguém perguntar.
- Migrações versionadas em `drizzle/` — o plugin de build já está preparado para empacotá-las.

**A favor:** auditoria e isolamento retroativos são quase impossíveis; nascer com eles é barato.
**Contra:** modelar nove tabelas antes do primeiro cliente é o tipo de coisa que trava projeto. Mitigação: implementar as tabelas, adiar as telas.

---

### Etapa 5 — Relatórios e arquivos

A etapa regulada. Núcleo do valor e maior concentração de risco.

- Upload direto para storage por URL pré-assinada de curta duração; o arquivo não passa pelo servidor da aplicação.
- Bucket **privado por padrão**, sem qualquer leitura pública. Download sempre por URL assinada e expirável, gerada após checagem de permissão.
- Validação de tipo e tamanho no servidor, por conteúdo e não por extensão.
- Criptografia em repouso e em trânsito. Versionamento de documento, já que "edições pedidas" é requisito declarado.
- Política de retenção explícita, com prazo e eliminação ao fim do projeto — e uma tela que permita ao cliente exportar tudo antes disso.
- Nenhum nome de arquivo, título de projeto ou identificador de cliente em log, URL indexável ou mensagem de erro.

**A favor:** é o que o cliente efetivamente compra — receber o relatório em lugar sério em vez de anexo de WhatsApp.
**Contra:** é onde um erro vira incidente de dado sensível. Não deve ser construída antes das Etapas 1, 3 e 4 estarem fechadas, e recomenda-se revisão de segurança dedicada ao fim dela.

---

### Etapa 6 — Agendamento de calls

Duas rotas:

| Opção | A favor | Contra |
|---|---|---|
| Integrar Cal.com / Google Calendar | Semanas de trabalho economizadas; lida com fuso, conflito, lembrete e convite | Dependência externa; o agendamento vive fora do portal; personalização limitada |
| Construir no portal | Integrado ao projeto e ao histórico; controle total | Agendamento é enganosamente difícil — fuso horário e disponibilidade consomem muito mais tempo do que parece |

*Recomendação: integrar.* Reservar esforço próprio para o que diferencia a Metropolis, que não é calendário.

---

### Etapa 7 — Comunicação e pedidos de edição

Thread por projeto, com anexos, estados (`aberto`, `em análise`, `resolvido`) e notificação por e-mail. Substitui a troca por WhatsApp, que hoje é o canal — e que não deixa rastro, não versiona e não separa contextos.

**A favor:** cria o registro das decisões metodológicas, que é coerente com o discurso de reprodutibilidade do próprio site. Concentra o relacionamento no produto.
**Contra:** cliente pode simplesmente continuar usando WhatsApp; funcionalidade construída e não adotada. Vale validar com dois ou três clientes antes de construir.

---

### Etapa 8 — Operação e continuidade

- Monitoramento de erro e disponibilidade; alerta em falha de login e em pico de acesso a documentos.
- Backup testado — backup não restaurado não é backup.
- Plano de resposta a incidente com prazo de comunicação à ANPD e aos titulares.
- Política de privacidade e termos de uso do portal, distintos da `/privacidade` atual, que hoje declara corretamente que o site não coleta dados. **Essa página passará a estar errada no dia em que o portal existir** — e ela é coberta por teste, então a mudança precisa ser deliberada.
- Revisão de acessos periódica; remoção de acesso ao encerrar projeto.

**A favor:** é o que separa "sistema" de "protótipo em produção".
**Contra:** custo recorrente de atenção, sem retorno visível — até o dia em que há.

---

## 4. Sequenciamento sugerido

| Fase | Etapas | Resultado |
|---|---|---|
| Imediata | 0 | Site atual mais seguro e com CI. Nada quebra |
| Decisão | 1 | ADR aprovado. Sem código |
| Preparação | 2 | Monorepo; landing intacta |
| Portal mínimo | 3 + 4 | Login funcionando, cliente vê o próprio projeto vazio |
| Valor | 5 | Relatórios entregues pelo portal. Revisão de segurança |
| Expansão | 6 + 7 | Agenda e comunicação |
| Contínua | 8 | Começa junto com a Etapa 5, não depois |

Um portal utilizável começa em 3+4+5. As Etapas 0–2 são o que torna 3–5 sustentáveis em vez de improvisadas.

---

## 5. Argumentos contra o plano inteiro

Registrados porque a decisão é de vocês e merece o contraditório:

- **É pesado para o estágio atual.** Zero clientes no portal e duas pessoas. Um Google Drive com pasta por cliente resolve 80% do problema em uma tarde, e custa nada.
- **A parte cara não é o software.** É a conformidade, o contrato e a operação — e essa parte não some escolhendo bem a stack.
- **Risco de construir o errado.** As Etapas 6 e 7 presumem que clientes querem agendar e conversar no portal. Isso é hipótese, não fato observado.
- **Manutenção é permanente.** Um sistema autenticado com dado sensível exige atualização de dependência e atenção a CVE indefinidamente. Isso compete com o trabalho que gera receita.

**Contra-argumento honesto:** o Drive resolve o armazenamento, mas não resolve o posicionamento. O site inteiro vende rigor, rastreabilidade e reprodutibilidade — entregar por link de Drive contradiz o discurso. O portal é, em boa medida, um argumento comercial materializado. Isso justifica o investimento; não justifica fazê-lo tudo de uma vez.

---

## 6. O que preciso de vocês para seguir

1. Aprovação ou ajuste da **separação site/portal** (seção 2) — condiciona tudo.
2. Decisão sobre **vinext** (1.1) — migrar cedo é barato, tarde não é.
3. Definição de escopo do dado: **clientes vão subir bancos brutos, ou só recebem entregáveis?** Muda o peso da Etapa 5 substancialmente.
4. Confirmação sobre **domínio próprio** e sobre quem responde juridicamente pelos dados.
5. Prioridade entre **Etapa 0 agora** (higiene, baixo custo, resultado imediato) e **Etapa 1 agora** (decisões, sem resultado visível).

---

## Fontes consultadas

- [Building authentication in Next.js App Router: the complete guide for 2026 — WorkOS](https://workos.com/blog/nextjs-app-router-authentication-guide-2026)
- [Guides: Authentication — Next.js](https://nextjs.org/docs/app/guides/authentication)
- [Next.js Security Best Practices: Complete 2026 Guide — Authgear](https://www.authgear.com/post/nextjs-security-best-practices/)
- [Next.js 16 Auth Security: 5 Mistakes Exposing Your App in 2026](https://www.nexgismo.com/blog/nextjs-16-auth-security-mistakes-2026)
- [I tested every major auth library for Next.js in 2026 — LogRocket](https://blog.logrocket.com/best-auth-library-nextjs-2026/)
- [Tratamento de dados em saúde: bases legais, limites e boas práticas — Migalhas](https://www.migalhas.com.br/depeso/449916/tratamento-de-dados-em-saude-bases-legais-limites-e-boas-praticas)
- [Desafios LGPD Saúde: dados sensíveis e compliance setorial 2026 — Amblegis](https://blog.amblegis.com.br/privacidade-e-protecao-de-dados/desafios-lgpd-saude-dados-sensiveis-e-compliance-setorial-2026/)
- [LGPD — Comitê de Integridade Científica e Boas Práticas em Pesquisa, FMRP-USP](https://cic.fmrp.usp.br/perguntas-frequentes/lgpd/)
