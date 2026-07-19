# Pauta — reunião sobre a plataforma

**Para:** Caio e Vitor
**Atualizado em:** 19 de julho de 2026
**Objetivo:** destravar as decisões que hoje bloqueiam a área de clientes, e fechar pendências antigas que ficaram abertas com o site já no ar.

Documentos de referência: [ADR-001](adr-001-plataforma-do-portal.md) (decisões tomadas), [plano de plataforma](../.plan/01_plataforma-e-area-do-cliente.md) (as 8 etapas), [checklist de aprovação](checklist-aprovacao.md) (pendências de julho), [QA técnico](qa-tecnico.md).

---

## 1. Onde o projeto está

**Feito:**
- Site institucional no ar, com landing única.
- `main` publicada no GitHub, com tag `v1.0-landing` como ponto de retorno.
- CI rodando lint e a suíte de testes a cada push.
- Dependabot semanal ativo.
- Cabeçalhos de segurança implementados e testados.
- Decisões de plataforma registradas no ADR-001.

**Decidido (ADR-001):** portal transporta só entregáveis, sem upload do cliente; site e portal em aplicações separadas; Cloudflare em conta própria + Supabase.

**Próxima etapa técnica:** o monorepo (Etapa 2), que não depende de nenhuma decisão desta pauta.

---

## 2. Achado que precisa de decisão hoje

**A produção está desatualizada e ninguém tem o processo de deploy definido.**

O site responde em `metropolis-analytics.caiosainvallio.chatgpt.site` — verificado, HTTP 200, público. Mas ele roda uma build antiga: **nenhum dos cabeçalhos de segurança que estão na `main` chegou lá.**

Isso expõe uma lacuna maior que o próprio cabeçalho: não está escrito em lugar nenhum quem publica, quando publica e como se confere que a publicação deu certo. Enquanto isso for informal, todo trabalho de segurança fica no repositório e não no ar.

**Para decidir:**
- Quem tem acesso de publicação hoje?
- O deploy passa a ser automático quando a `main` muda, ou continua manual e deliberado?
- Quem confere depois que subiu?

---

## 3. Decisões que dependem do Caio

### 3.1 Domínio próprio
O site vive num subdomínio de plataforma. Um portal com login precisa de domínio da Metropolis — por credibilidade comercial e porque sessão autenticada em subdomínio compartilhado é má prática.
**Pergunta:** a Metropolis já tem domínio registrado? Em nome de quem?

### 3.2 Contas de infraestrutura
O ADR define Cloudflare em conta própria + Supabase.
**Pergunta:** quem cria, quem paga, e os dois sócios têm acesso? Contas de infraestrutura em nome pessoal viram problema quando alguém fica indisponível.

### 3.3 Papel jurídico no tratamento dos dados
A Metropolis é controladora ou operadora dos dados que constam dos relatórios? Muda contrato, política de privacidade e obrigações.
Com a decisão de não aceitar bancos de dados, o peso caiu bastante — mas a definição continua necessária. **É conversa com advogado, não decisão de engenharia.**

### 3.4 Validação do escopo "só entregáveis"
Decidimos que o cliente **não** faz upload: a Metropolis publica, o cliente baixa. O banco continua indo pelo canal atual.
**Pergunta ao Caio:** isso corresponde a como o trabalho acontece na prática? Se na realidade o cliente manda dado o tempo todo e o portal ignorar isso, ele nasce inútil — e a decisão precisa ser revista antes de construir, não depois.

---

## 4. Pendências de julho que nunca foram fechadas

Registradas em [checklist-aprovacao.md](checklist-aprovacao.md) e [qa-tecnico.md](qa-tecnico.md), com o site **já público**:

| Pendência | Por que importa |
|---|---|
| Aprovação editorial final da homepage | Ninguém assinou embaixo do texto que está no ar |
| Confirmar se nomes, credenciais e WhatsApp seguem atuais | São afirmações públicas sobre pessoas reais |
| Aprovação jurídica da Política de Privacidade | Ela afirma como vocês tratam dados |
| Smoke test real em desktop e mobile | Nunca foi feito |
| Lighthouse, contraste computado, leitor de tela | Nunca foi feito |

O ponto do QA técnico merece destaque: **toda a validação foi estática.** O documento é explícito e honesto sobre isso — responsividade, foco, contraste e leitor de tela foram inspecionados no código, nunca num navegador de verdade. O site está no ar sem que ninguém tenha percorrido ele numa tela real de forma registrada.

Não é alarme: o CSS foi bem construído e os testes cobrem bastante. É uma lacuna conhecida que nunca foi fechada, e fechá-la é barato.

### Um item específico sobre credenciais

[fontes-credenciais.md](fontes-credenciais.md) registra que a afirmação sobre o Vitor — "cientista de dados com experiência em análise epidemiológica e modelagem estatística" — não pôde ser verificada de forma independente, só pelo LinkedIn. O título de mestre está confirmado pela Santa Casa. Vale uma decisão consciente: manter, ajustar ou sustentar com outra fonte pública.

---

## 5. Perguntas de produto, antes de construir

O plano prevê agendamento de calls (Etapa 6) e troca de mensagens/pedidos de edição (Etapa 7). **Isso é hipótese, não fato observado.**

- Os clientes querem agendar por um portal, ou o WhatsApp resolve e eles não vão migrar?
- Os pedidos de edição têm volume que justifique sair do WhatsApp?

Sugestão: validar com dois ou três clientes atuais antes de construir. Funcionalidade construída e não adotada é o desperdício mais caro do plano.

---

## 6. A pergunta de fundo

Vale registrar o contra-argumento honesto, para a decisão ser consciente:

**Um Drive com pasta por cliente resolve 80% da entrega de relatórios numa tarde, de graça.** O portal só se justifica se o argumento for de posicionamento — o site inteiro vende rigor, rastreabilidade e reprodutibilidade, e entregar por link de Drive contradiz esse discurso.

Isso justifica o investimento, mas não justifica fazer tudo de uma vez. As Etapas 2 a 5 entregam um portal utilizável; as 6 e 7 podem esperar evidência de demanda.

---

## 7. Encaminhamentos

Preencher na reunião:

- [ ] Deploy: responsável e processo definidos
- [ ] Domínio próprio: existe? em nome de quem?
- [ ] Contas Cloudflare e Supabase: quem cria e quem tem acesso
- [ ] Consulta jurídica sobre controladora/operadora: quem procura, até quando
- [ ] Escopo "só entregáveis" confirmado ou revisto pelo Caio
- [ ] Pendências de julho: quem fecha cada uma
- [ ] Etapas 6 e 7: validar com clientes antes de construir?
- [ ] Seguir para a Etapa 2 (monorepo) agora, ou esperar?
