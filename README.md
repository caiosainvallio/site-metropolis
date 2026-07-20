# Metropolis Analytics

Monorepo da Metropolis Analytics, consultoria metodológica e estatística voltada a pesquisas de mestrado e doutorado na área da saúde.

São duas aplicações que compartilham um design system:

- **`apps/site`** — site institucional público (landing). Apresenta serviços, processo de trabalho, credenciais da equipe, FAQ, contato e política de privacidade.
- **`apps/portal`** — área de clientes (autenticada). Hoje é um placeholder `noindex`; a autenticação entra na Etapa 3.

O raciocínio de arquitetura está em [docs/adr-001-plataforma-do-portal.md](docs/adr-001-plataforma-do-portal.md).

Produção (site): [metropolis-analytics.caiosainvallio.chatgpt.site](https://metropolis-analytics.caiosainvallio.chatgpt.site)

## Tecnologias

- npm workspaces (monorepo)
- Next.js e React
- vinext e Vite
- Tailwind CSS
- Cloudflare Workers, via Sites

## Pré-requisitos

- Node.js 22.13.0 ou superior
- npm

## Rodar localmente

Clone o repositório, acesse a pasta do projeto e instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento do **site** (porta 3000):

```bash
npm run dev
```

Para rodar o **portal** (porta 3001), em outro terminal:

```bash
npm run dev:portal
```

Abra no navegador o endereço local exibido no terminal. Alterações nos arquivos são refletidas automaticamente durante o desenvolvimento.

As principais rotas do site para teste são:

- `/` — página inicial
- `/privacidade` — política de privacidade

## Validação

Execute os testes de todos os workspaces (a suíte do site também gera uma build de produção):

```bash
npm test
```

Para executar as verificações de estilo:

```bash
npm run lint
```

Os comandos de raiz delegam a cada workspace. Para agir em um app específico, use `-w`, por exemplo:

```bash
npm test -w @metropolis/site
npm run build -w @metropolis/portal
```

## Estrutura principal

```text
apps/
  site/       Landing pública
    app/          Páginas, layout e estilos globais
    public/       Imagens e demais arquivos públicos
    tests/        Testes automatizados
    .openai/      Configuração de hospedagem no Sites
  portal/     Área de clientes (placeholder noindex)
packages/
  ui/         Design tokens compartilhados (tokens.css) e marca
  config/     Bases de tsconfig e ESLint compartilhadas
```
