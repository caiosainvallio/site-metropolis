# Metropolis Analytics

Site institucional da Metropolis Analytics, consultoria metodológica e estatística voltada a pesquisas de mestrado e doutorado na área da saúde.

O site apresenta os serviços oferecidos, o processo de trabalho, as credenciais da equipe, perguntas frequentes, formas de contato e a política de privacidade.

Produção: [metropolis-analytics.caiosainvallio.chatgpt.site](https://metropolis-analytics.caiosainvallio.chatgpt.site)

## Tecnologias

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

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço local exibido no terminal. Alterações nos arquivos são refletidas automaticamente durante o desenvolvimento.

As principais rotas para teste são:

- `/` — página inicial
- `/privacidade` — política de privacidade

## Validação

Execute os testes do projeto, que também geram uma build de produção:

```bash
npm test
```

Para executar as verificações de estilo separadamente:

```bash
npm run lint
```

## Testar a build de produção localmente

Gere a build e inicie o servidor de produção:

```bash
npm run build
npm run start
```

Use o endereço informado no terminal para conferir o resultado.

## Estrutura principal

```text
app/          Páginas, layout e estilos globais
public/       Imagens e demais arquivos públicos
tests/        Testes automatizados
.openai/      Configuração de hospedagem no Sites
```
