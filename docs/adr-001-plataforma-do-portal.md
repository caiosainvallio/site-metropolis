# ADR-001 — Plataforma do portal de clientes

**Estado:** aceito
**Data:** 19 de julho de 2026
**Decisores:** Vitor Sain Vallio
**Contexto maior:** [.plan/01_plataforma-e-area-do-cliente.md](../.plan/01_plataforma-e-area-do-cliente.md)

Registro das decisões da Etapa 1. Um ADR existe para que, daqui a um ano, alguém entenda **por que** as coisas são como são — inclusive vocês mesmos.

---

## Decisão 1 — O portal transporta entregáveis, não bancos de dados

O portal guarda e entrega o que a Metropolis produz: relatórios, tabelas, figuras, documentos de método. O banco de dados do cliente **não** entra no portal e continua trafegando pelo canal combinado caso a caso.

### Por quê

Aceitar upload de banco de pesquisa clínica transformaria o portal em um sistema que trata dado pessoal sensível (LGPD art. 5º, II e art. 11). Isso traria criptografia gerenciada, registro de auditoria por acesso, política formal de retenção e eliminação, DPA com o fornecedor de storage e plano de resposta a incidente — obrigações contínuas, desproporcionais ao estágio atual de duas pessoas e nenhum cliente no portal.

### O que isso não significa

Não significa que o portal fica fora da LGPD. Continuam sendo dado pessoal, e continuam exigindo cuidado:

- a identificação dos clientes (nome, e-mail, instituição);
- o título e o tema dos projetos, que revelam linha de pesquisa não publicada;
- os próprios relatórios, que são confidenciais mesmo quando agregados — pesquisa não publicada tem valor e tem embargo.

### Consequência de projeto: a restrição precisa ser real

Uma regra que existe só no contrato será quebrada. No dia em que houver um botão de upload genérico, algum orientando sobe o `.xlsx` com nome de paciente — sem má-fé, por conveniência. Então:

- Na primeira versão, **o cliente não faz upload**. O fluxo é de mão única: a Metropolis publica, o cliente baixa.
- Pedidos de edição e dúvidas vão por texto (Etapa 7), não por anexo.
- Quando o anexo do cliente for inevitável, ele precisa vir com aviso explícito na interface e restrição de tipo — e aí esta decisão é reaberta em um ADR novo, não contornada em silêncio.

---

## Decisão 2 — Site institucional e portal são duas aplicações

Monorepo com `apps/site` (landing atual) e `apps/portal` (novo), compartilhando `packages/ui` e `packages/config`.

### Por quê

- A landing é a peça comercial. Ela não deve carregar SDK de autenticação nem cliente de banco para exibir texto.
- Cadências diferentes: a landing muda por decisão editorial, raramente; o portal muda continuamente. Junto, cada deploy de funcionalidade arrisca o material de vendas — hoje protegido por uma suíte de testes de conteúdo que passaria a rodar a cada mudança de backend.
- Reversibilidade: se a plataforma do portal se mostrar errada, migra-se o portal sem tocar no site indexado e funcionando.

### Custo aceito

Mais infraestrutura, dois deploys, e a necessidade de extrair um design system compartilhado em vez de copiar estilos. Para duas pessoas, isso é overhead real — assumido conscientemente em troca de contenção.

### Nota honesta

O argumento mais forte para separar era a sensibilidade do dado, e a Decisão 1 enfraqueceu esse argumento. A separação segue justificada pelos outros três motivos acima, mas com margem menor do que quando o plano foi escrito. Se o overhead do monorepo se mostrar pesado na prática, reabrir esta decisão é legítimo — não seria um erro, seria uma reavaliação com informação nova.

---

## Decisão 3 — Cloudflare em conta própria, com Supabase para dados e login

- **Hospedagem:** Cloudflare Workers, em conta da Metropolis.
- **Banco, autenticação e storage:** Supabase.
- **Adapter:** o `vinext` permanece.

### Por quê

Mantém o runtime que o site já usa e que a equipe já conhece, e traz Postgres maduro com **Row Level Security** — o banco recusa a leitura de um projeto por quem não é membro dele, mesmo que a aplicação erre a query. Esse é o controle que impede o pior erro clássico de portal: um cliente vendo o relatório de outro. Autenticação terceirizada evita que duas pessoas cujo ofício é estatística mantenham infraestrutura de login.

### O risco que está sendo aceito: vinext 0.0.50

O `vinext` é o que faz o Next.js rodar em Workers, e está em versão pré-1.0. Hoje ele serve HTML estático; no portal, ele passa a mediar rotas autenticadas.

Mitigações adotadas:

- **A autorização não depende do adapter.** A RLS do Supabase é a última barreira e vive no banco. Um erro de roteamento no vinext não vira vazamento, vira erro.
- **Verificação em cada Server Action e Route Handler**, nunca só em middleware.
- **Gatilho de reavaliação:** se o vinext apresentar bug de roteamento ou de headers em produção, ou ficar sem atualização por um período longo, a migração para Vercel volta à mesa. Não é uma decisão permanente.

### Alternativa descartada

Vercel + Supabase eliminaria o risco do adapter e é o caminho mais trilhado do Next.js. Foi preterida por custo crescente e por exigir migrar o worker que já funciona. Continua sendo o plano B natural.

---

## Ainda em aberto — bloqueiam a Etapa 5

Estas duas não são decisões técnicas e não devem ser resolvidas por chute:

1. **Domínio próprio.** O site vive hoje em `metropolis-analytics.caiosainvallio.chatgpt.site`. Um portal com login precisa de domínio da empresa — por credibilidade comercial e porque cookie de sessão em subdomínio de plataforma compartilhada é má prática. É preciso saber se a Metropolis já tem domínio registrado.
2. **Papel na cadeia de tratamento.** A Metropolis é controladora ou operadora dos dados que constam dos relatórios? A resposta muda contrato, política de privacidade e obrigações. Com a Decisão 1 o peso caiu bastante, mas a definição continua necessária — e é conversa com advogado, antes da Etapa 5.

---

## Provisionamento necessário

O que precisa ser criado pela equipe, com credenciais que não passam por este repositório:

- [ ] Conta Cloudflare da Metropolis (não pessoal), com 2FA e acesso para os dois sócios
- [ ] Projeto Supabase, **com região definida conscientemente** — verificar se há região no Brasil e o que isso implica
- [ ] Domínio próprio registrado e apontado
- [ ] Cofre de segredos combinado (nunca em commit; `.env*` já está no `.gitignore`)

---

## Consequência imediata para a política de privacidade

A página [/privacidade](../app/privacidade/page.tsx) declara hoje, corretamente, que o site não coleta dados e não tem formulário próprio. **Isso passa a ser falso no dia em que o portal existir.** A afirmação está coberta por teste automatizado, então a mudança será deliberada e não silenciosa — mas precisa entrar no mesmo release do portal, não depois.
