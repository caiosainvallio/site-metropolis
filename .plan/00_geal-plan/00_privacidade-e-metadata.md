# Task 08 — Privacidade, metadata e descoberta

## Objetivo

Criar a rota `/privacidade` e alinhar metadata, sitemap, robots e cartão social ao novo posicionamento institucional, sem referências a clientes ou relatórios.

## Dependências

- Task 01 — Auditoria e salvaguardas.
- Task 07 — Princípios, equipe e contato.

## Escopo

- Criar `/privacidade` em português brasileiro.
- Explicar a ausência de formulário próprio.
- Informar que WhatsApp e perfis profissionais são links externos sujeitos às políticas de terceiros.
- Descrever, sem promessas indevidas, os dados técnicos que podem ser processados pela hospedagem.
- Explicar a confidencialidade dos projetos e indicar canal para solicitações de privacidade.
- Adicionar links para `/privacidade` nos pontos pertinentes da homepage e do rodapé.
- Atualizar title, description, canonical e Open Graph/Twitter quando aplicável.
- Atualizar sitemap e robots quando aplicável à stack.
- Atualizar o cartão social sem clientes, relatórios, dados simulados como reais ou alegações de resultado.

## Entregáveis

- Página `/privacidade` navegável.
- Metadata institucional e cartão social atualizados.
- Sitemap/robots coerentes com as duas rotas públicas.

## Critérios de aceite

- A política cobre os cinco temas obrigatórios: formulário, terceiros, hospedagem, confidencialidade e solicitações.
- Homepage e privacidade possuem títulos e descrições próprios.
- `/privacidade` está acessível por navegação interna e incluída no sitemap quando este existir.
- Nenhuma superfície de metadata contém conteúdo privado ou legado de portfólio.

## Validação final da task

1. Executar o build e abrir `/` e `/privacidade` diretamente.
2. Inspecionar HTML, metadata e imagem social com `rg -ni "rpubs|relat[oó]rio|cliente|trabalhos" app public dist .next`, ignorando apenas artefatos comprovadamente fora da saída pública.
3. Validar title, description, canonical, Open Graph e navegação entre as rotas.
4. Conferir sitemap e robots contra as rotas efetivamente públicas.
5. A task está concluída quando as duas páginas são descobertas corretamente e nenhuma referência vedada aparece nas superfícies publicáveis.

